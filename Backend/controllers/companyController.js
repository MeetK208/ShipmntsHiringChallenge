import Book from "../models/Book.js";
import Author from "../models/Author.js";
import parseExcelFile from "../utils/excelParser.js";

const temporaryStore = {}; // Temporary storage, use a database or cache in production
const allData = {};

// Function to convert Excel date to JS Date
const excelDateToJSDate = (serial) => {
  if (!serial || isNaN(serial)) return null; // Check if serial is valid
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // Convert days to seconds
  const date_info = new Date(utc_value * 1000); // Convert seconds to milliseconds
  return date_info;
};

const formatDate = (date) => {
  if (!date) return null; // Handle null or undefined input

  let parsedDate;

  // If the date is a string or number, try to convert it to a Date object
  if (typeof date === "string" || typeof date === "number") {
    parsedDate = new Date(date);
  } else if (date instanceof Date) {
    parsedDate = date; // If it's already a Date object, use it directly
  } else {
    return null; // If it's neither, return null
  }

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  // Return the formatted date as 'YYYY-MM-DD'
  return parsedDate.toISOString().split("T")[0];
};

export const uploadExcel = async (req, res) => {
  try {
    const file = req.file.buffer;
    const parsedData = parseExcelFile(file);

    // Check for missing required columns
    for (let i = 0; i < parsedData.length; i++) {
      if (
        !parsedData[i]["Book Name"] ||
        !parsedData[i]["ISBN Code"] ||
        !parsedData[i]["Author Name"] ||
        !parsedData[i]["Author Email"]
      ) {
        return res
          .status(400)
          .json({ error: "Add all required columns in the file" });
      }
    }

    // Initialize arrays for authors and books
    const author = [];
    const books = [];

    parsedData.forEach((row) => {
      console.log("Raw Date Value:", row["Date of Birth"]); // Add this line for debugging
      let dateBirth = row["Date of Birth"] || null;
      author.push({
        name: row["Author Name"],
        email: row["Author Email"],
        dateOfBirth: formatDate(dateBirth), // Use the updated formatDate function
      });
    });

    parsedData.forEach((row) => {
      books.push({
        name: row["Book Name"],
        ISBNCode: row["ISBN Code"],
      });
    });

    // Output results
    console.log("Authors:", author);
    console.log("Books:", books);

    // Generate a unique session ID
    const sessionId = Date.now(); // Simple session ID for demo purposes

    temporaryStore[sessionId] = { author, books };
    allData[sessionId] = parsedData;

    console.log("Data stored in temporary store:", temporaryStore[sessionId]);
    res.status(200).json({
      message: "File uploaded and data parsed successfully",
      sessionId,
      parsedData,
    });
  } catch (error) {
    console.error("Error processing upload:", error.message);
    res.status(500).json({ error: "Failed to process upload" });
  }
};

export const getAllData = (req, res) => {
  const { sessionId } = req.params;
  const allDataRows = allData[sessionId];

  if (!data) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.status(200).json(allDataRows);
};

export const reviewData = (req, res) => {
  const { sessionId } = req.params;
  const data = temporaryStore[sessionId];

  if (!data) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.status(200).json(data);
};

export const confirmData = async (req, res) => {
  const { sessionId } = req.params;
  const parsedData = allData[sessionId]; // Ensure allData is defined in the appropriate scope
  if (!parsedData) {
    return res.status(404).json({ error: "Session not found" });
  }

  try {
    const authors = {};
    const books = [];

    for (const row of parsedData) {
      const {
        "Author Name": authorName,
        "Author Email": authorEmail,
        "Date of Birth": dob,
        "Book Name": bookName,
        "ISBN Code": isbnCode,
      } = row;

      // Check if the author already exists in the map
      if (!authors[authorName]) {
        // Find the author by name and email in the database
        let author = await Author.findOne({
          name: authorName,
          email: authorEmail,
        });

        if (!author) {
          // Convert date of birth to JS Date
          const dateOfBirth = excelDateToJSDate(dob);

          // If author does not exist, create a new one
          author = new Author({
            name: authorName,
            email: authorEmail,
            dateOfBirth,
          });
          await author.save();
        }

        // Store the authorID in the authors map
        authors[authorName] = author._id;
      }

      // Prepare the book data with the mapped authorID
      books.push({
        name: bookName,
        ISBNCode: isbnCode,
        AuthorID: authors[authorName], // Ensure this matches the schema exactly
      });
    }

    // Insert all books into the database
    await Book.insertMany(books);

    res.status(201).json({ message: "Data successfully stored" });
  } catch (error) {
    console.error("Error storing data:", error.message);
    res.status(500).json({ error: "Failed to store data" });
  }
};

export const rejectData = (req, res) => {
  const { sessionId } = req.params;
  const data = temporaryStore[sessionId];
  console.log(temporaryStore[sessionId]);
  if (!data) {
    return res.status(404).json({ error: "Session not found" });
  }

  delete temporaryStore[sessionId];

  res
    .status(200)
    .json({ message: "Data rejected and removed from temporary storage" });
};
