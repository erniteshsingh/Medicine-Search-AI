#Med-Insight AI: Intelligent Pharmaceutical Analyzer

Med-Insight AI ek advanced Backend system hai jo users ko unki medicines samajhne mein madad karta hai. Ye system **Google Gemini 2.5 Flash** ka use karke text aur images (photos) dono se medical information extract karta hai.

---

## Key Features (Currently Implemented)

### 1. AI-Powered Multimodal Analysis
- **Text-to-Report**: Kisi bhi medicine ya salt ka naam likhne par uska poora detailed report generate hota hai.
- **Vision-to-Insights**: Medicine ki photo upload karte hi AI use recognize karta hai aur brand name extract karta hai.
- **Smart Data Extraction**: AI response se automatic medicine name parse karke Database (`query` field) mein save karta hai.

### 2. Security & Authentication
- **JWT Authentication**: Secure login aur signup flow (Email/Password).
- **Protected Routes**: Sirf authenticated users hi AI features ka use kar sakte hain.
- **Cookie-based Sessions**: Secure `httpOnly` cookies ka use karke authentication handle kiya gaya hai.

---

##  Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI Engine**: Google Generative AI (Gemini 2.5 Flash)
- **File Handling**: Multer (Memory Storage)

---

##  How to Setup & Run (Installation)


Apne local system par is project ko chalane ke liye niche diye gaye steps follow karein:

### 1. Clone the Project
Sabse pehle repository ko clone karein:
-git clone [https://github.com/your-username/medicine-ai-project.git](https://github.com/your-username/medicine-ai-project.git)
cd medicine-ai-project

### Install Dependencies (npm install)
### Environment Setup (.env)
-PORT=3000
-MONGO_URI=your_mongodb_connection_string
-JWT_SECRET=your_super_secret_key
-GEMINI_API_KEY=your_google_gemini_api_key
### Run server (npm run dev)

