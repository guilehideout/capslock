import { spawn } from "child_process";

const pythonProcess = spawn("python3", ["./ai/", imagePath]);

export async function validateReport(report) {
  // In practice, send report.photo_url to an AI model
  // Return 'verified' or 'rejected' based on model confidence
  if (report.type && report.photo_url) {
    return "verified";
  }
  return "rejected";
}



let output = "";
pythonProcess.stdout.on("data", (data) => {
  output += data.toString();
});

pythonProcess.on("close", () => {
  console.log("Classification:", output.trim());
});

