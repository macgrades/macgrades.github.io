package com.ritual.macgradesweb;

import Courses.Course;
import PDF.CourseParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class UploadController {
    @PostMapping ("/upload")
    public ResponseEntity<String> getCourses(@RequestParam("pdfFile") MultipartFile file) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Transcript file is required.");
            }
            List<Course> courseList = parseTranscript(file);
            ObjectMapper objectMapper = new ObjectMapper();
            String courseListJson = objectMapper.writeValueAsString(courseList);
            return ResponseEntity.ok(courseListJson);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    private List<Course> parseTranscript(MultipartFile file) throws IOException {
        PDDocument pdDoc = Loader.loadPDF(file.getInputStream());
        PDFTextStripper reader = new PDFTextStripper();
        String pageText = reader.getText(pdDoc);
        pdDoc.close();
        String[] lines = pageText.split("\n");
        return CourseParser.getGradedCourses(lines);
    }


}
