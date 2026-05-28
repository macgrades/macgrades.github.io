import { extractText } from "unpdf";

export const parsePDFtoTextLines = async (file) => {
  try {
    const buffer = await file.arrayBuffer();

    const { text } = await extractText(buffer);

    return text.join("\n").split("\n");
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
};
