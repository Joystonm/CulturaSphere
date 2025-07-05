// Test script for jsPDF
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Create a simple PDF
function createTestPDF() {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Test PDF Document', 105, 20, { align: 'center' });
  
  // Add some text
  doc.setFontSize(12);
  doc.text('This is a test PDF document created with jsPDF', 20, 40);
  
  // Add a table
  doc.autoTable({
    startY: 50,
    head: [['Name', 'Email', 'Country']],
    body: [
      ['John Doe', 'john@example.com', 'USA'],
      ['Jane Smith', 'jane@example.com', 'Canada'],
      ['Bob Johnson', 'bob@example.com', 'UK']
    ],
  });
  
  // Save the PDF
  doc.save('test-document.pdf');
  
  console.log('PDF created successfully!');
}

// Export the function
export default createTestPDF;
