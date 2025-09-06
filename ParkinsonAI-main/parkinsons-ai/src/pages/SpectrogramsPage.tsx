// import { useState } from "react";

// function SpectrogramsPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [results, setResults] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a .wav file first!");
//       return;
//     }

//     setError(null);
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       console.log("📤 Sending file to backend:", file.name);

//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Server error ${res.status}: ${errText}`);
//       }

//       const data = await res.json();
//       console.log("✅ Response from backend:", data);
//       setResults(data);
//     } catch (err: any) {
//       console.error("❌ Upload failed:", err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Test Parkinson Prediction</h1>
//       <input
//         type="file"
//         accept="audio/wav"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />
//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         className={`ml-4 px-4 py-2 rounded text-white ${
//           loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {loading ? "Uploading..." : "Upload & Predict"}
//       </button>

//       {error && <p className="mt-4 text-red-600">{error}</p>}

//       {results && (
//         <div className="mt-6 space-y-6">
//           {results.chunks.map((chunk: any, idx: number) => (
//             <div key={idx} className="border p-4 rounded shadow">
//               <h2 className="font-semibold">Chunk {chunk.chunk}</h2>
//               <img
//                 src={`data:image/png;base64,${chunk.spectrogram}`}
//                 alt={`Chunk ${chunk.chunk}`}
//                 className="my-2 rounded"
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(chunk.predictions).map(([model, pred]: any) => (
//                   <div key={model} className="p-2 border rounded">
//                     <strong>{model.toUpperCase()}</strong>
//                     <p>{pred.label}</p>
//                     {pred.score !== null ? (
//                       <p className="text-sm text-gray-500">Score: {pred.score.toFixed(4)}</p>
//                     ) : (
//                       <p className="text-sm text-red-500">Prediction error</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SpectrogramsPage;


// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // Hard-coded metrics data to resolve import issues
// const metricsData = {
//   cnn_lstm: {
//     accuracy: 0.86,
//     precision: 0.85,
//     recall: 0.87,
//     f1_score: 0.86,
//   },
//   bilstm: {
//     accuracy: 0.74,
//     precision: 0.73,
//     recall: 0.75,
//     f1_score: 0.74,
//   },
//   mobilenetv2: {
//     accuracy: 0.91,
//     precision: 0.90,
//     recall: 0.91,
//     f1_score: 0.91,
//   },
//   resnet50: {
//     accuracy: 0.72,
//     precision: 0.71,
//     recall: 0.73,
//     f1_score: 0.72,
//   },
//   gru: {
//     accuracy: 0.50,
//     precision: 0.49,
//     recall: 0.51,
//     f1_score: 0.50,
//   },
// };

// // A component to display a single model's graph set
// const ModelGraphCard = ({ title, graphImage }) => (
//   <div className="bg-white rounded-xl shadow-lg p-6">
//     <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
//     <img
//       src={graphImage}
//       alt={`${title} Performance Graphs`}
//       className="w-full h-auto rounded-lg"
//     />
//   </div>
// );

// function SpectrogramsPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [results, setResults] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [view, setView] = useState<"spectrograms" | "predictions" | "metrics">(
//     "spectrograms"
//   );

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a .wav file first!");
//       return;
//     }

//     setError(null);
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // This URL is a placeholder and should be updated to a live backend
//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`Server error ${res.status}: ${errText}`);
//       }

//       const data = await res.json();
//       setResults(data);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Convert metrics data to a chart-friendly format
//   const chartData = Object.entries(metricsData).map(([model, values]: any) => ({
//     model: model.toUpperCase(),
//     Accuracy: values.accuracy,
//     Precision: values.precision,
//     Recall: values.recall,
//     F1: values.f1_score,
//   }));

//   return (
//     <div className="flex bg-gray-100 min-h-screen font-sans">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6 space-y-4 shadow-xl">
//         <h2 className="text-2xl font-extrabold text-center mb-8 tracking-wider">
//           Dashboard
//         </h2>
        
//         {/* Navigation buttons */}
//         <button
//           onClick={() => setView("spectrograms")}
//           className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
//             view === "spectrograms"
//               ? "bg-blue-600 text-white shadow-md transform scale-105"
//               : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
//           }`}
//         >
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 7.5c-.3 0-.5.2-.5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0V7.5c0-.3-.2-.5-.5-.5H1.5c-.3 0-.5.2-.5.5v11c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5zM2 9v9h16V9H2zm16-4V2.5c0-.3-.2-.5-.5-.5H1.5c-.3 0-.5.2-.5.5V5h17zM6 3H4v2h2V3zm4 0H8v2h2V3zm4 0h-2v2h2V3zm4 0h-2v2h2V3zM3 13h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 16h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 19h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
//           <span>Spectrograms</span>
//         </button>

//         <button
//           onClick={() => setView("predictions")}
//           className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
//             view === "predictions"
//               ? "bg-green-600 text-white shadow-md transform scale-105"
//               : "bg-gray-700 text-gray-200 hover:bg-green-500 hover:text-white"
//           }`}
//         >
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.5c-4.142 0-7.5 3.358-7.5 7.5S7.858 16.5 12 16.5c4.142 0 7.5-3.358 7.5-7.5S16.142 1.5 12 1.5zm-5 7.5c0-.3.2-.5.5-.5h4.793l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 10H7.5c-.3 0-.5-.2-.5-.5z"/></svg>
//           <span>Predictions</span>
//         </button>

//         <button
//           onClick={() => setView("metrics")}
//           className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
//             view === "metrics"
//               ? "bg-purple-600 text-white shadow-md transform scale-105"
//               : "bg-gray-700 text-gray-200 hover:bg-purple-500 hover:text-white"
//           }`}
//         >
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a.5.5 0 0 0-.5.5V9H2.5a.5.5 0 0 0 0 1H9v6.5a.5.5 0 0 0 1 0V10h6.5a.5.5 0 0 0 0-1H10V3a.5.5 0 0 0-.5-.5z"/></svg>
//           <span>Metrics</span>
//         </button>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-10 overflow-y-auto bg-gray-100">
//         <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
//           Test Parkinson Prediction
//         </h1>

//         {/* Upload section - Always visible */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
//           <label htmlFor="file-upload" className="flex-1 text-gray-700 font-medium">
//             Select a `.wav` file to upload:
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             accept="audio/wav"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="flex-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
//           />
//           <button
//             onClick={handleUpload}
//             disabled={loading || !file}
//             className={`flex-shrink-0 px-6 py-2 rounded-full font-bold text-white transition-all duration-200 ${
//               loading || !file
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 shadow-md"
//             }`}
//           >
//             {loading ? "Uploading..." : "Upload & Predict"}
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Spectrograms View */}
//         {results && view === "spectrograms" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.chunks.map((chunk, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-xl shadow-lg p-4 text-center"
//               >
//                 <h2 className="font-semibold text-gray-800 mb-2">
//                   Chunk {chunk.chunk}
//                 </h2>
//                 <img
//                   src={`data:image/png;base64,${chunk.spectrogram}`}
//                   alt={`Spectrogram of chunk ${chunk.chunk}`}
//                   className="w-full h-auto rounded-lg shadow-inner"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Predictions View */}
//         {results && view === "predictions" && (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Prediction Results
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                       Model
//                     </th>
//                     <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                       Prediction
//                     </th>
//                     <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                       Score
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.chunks[0] &&
//                     Object.entries(results.chunks[0].predictions).map(
//                       ([model, pred]) => (
//                         <tr key={model} className="hover:bg-gray-50 transition-colors">
//                           <td className="border-b p-4 font-semibold text-gray-700">
//                             {model.toUpperCase()}
//                           </td>
//                           <td className="border-b p-4 text-gray-600">
//                             {pred.label}
//                           </td>
//                           <td className="border-b p-4 text-gray-600">
//                             {pred.score?.toFixed(4) ?? "—"}
//                           </td>
//                         </tr>
//                       )
//                     )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Metrics View */}
//         {view === "metrics" && (
//           <div className="space-y-10">
//             {/* Metrics Chart */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 Model Metrics
//               </h2>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <XAxis dataKey="model" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="Accuracy" fill="#3b82f6" name="Accuracy" />
//                     <Bar dataKey="Precision" fill="#10b981" name="Precision" />
//                     <Bar dataKey="Recall" fill="#f59e0b" name="Recall" />
//                     <Bar dataKey="F1" fill="#ef4444" name="F1 Score" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Metrics Table */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 Detailed Metrics Table
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                         Model
//                       </th>
//                       <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                         Accuracy
//                       </th>
//                       <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                         Precision
//                       </th>
//                       <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                         Recall
//                       </th>
//                       <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
//                         F1 Score
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(metricsData).map(([model, values]) => (
//                       <tr key={model} className="hover:bg-gray-50 transition-colors">
//                         <td className="border-b p-4 font-semibold text-gray-700">
//                           {model.toUpperCase()}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {values.accuracy.toFixed(4)}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {values.precision.toFixed(4)}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {values.recall.toFixed(4)}
//                         </td>
//                         <td className="border-b p-4 text-gray-600">
//                           {values.f1_score.toFixed(4)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Model Graphs Section */}
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 Model Performance Graphs
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <ModelGraphCard
//                   title="CNN-LSTM Performance"
//                   graphImage="https://placehold.co/600x400/fff/000?text=CNN-LSTM+Graph"
//                 />
//                 <ModelGraphCard
//                   title="BiLSTM Performance"
//                   graphImage="https://placehold.co/600x400/fff/000?text=BiLSTM+Graph"
//                 />
//                 <ModelGraphCard
//                   title="MobileNetV2 Performance"
//                   graphImage="https://placehold.co/600x400/fff/000?text=MobileNetV2+Graph"
//                 />
//                 <ModelGraphCard
//                   title="ResNet50 Performance"
//                   graphImage="https://placehold.co/600x400/fff/000?text=ResNet50+Graph"
//                 />
//                 <ModelGraphCard
//                   title="GRU Performance"
//                   graphImage="https://placehold.co/600x400/fff/000?text=GRU+Graph"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SpectrogramsPage;
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 1. Import your local image assets.
// Make sure these paths are correct relative to the location of this file.
import cnnLstmGraph from "../assets/plots/CNN-LSTM.png";
import bilstmGraph from "../assets/plots/BiLSTM.png";
import gruGraph from "../assets/plots/GRU.png";
import mobilenetGraph from "../assets/plots/MobileNetV2.png";
import resnetGraph from "../assets/plots/ResNet50.png";
const ConfusionMatrix = ({ matrix }) => {
  const maxVal = Math.max(...matrix.flat());

  return (
    <div className="inline-block">
      {matrix.map((row, i) => (
        <div key={i} className="flex">
          {row.map((val, j) => {
            const intensity = Math.round((val / maxVal) * 255);
            return (
              <div
                key={j}
                className="w-16 h-16 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: `rgb(0,0,${intensity})` }}
              >
                {val}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Hard-coded metrics data to resolve import issues
const metricsData = {
  cnn:{
    
      accuracy: 0.93,
      precision: 0.92,
      recall: 0.95,
      f1_score: 0.93,
      confusion_matrix: [[262, 23],
      [
        14,
        271
      ]
    ]
  },
  cnn_lstm: {
    accuracy: 0.93,
    precision: 0.89,
    recall: 0.91,
    f1_score: 0.91,
    confusion_matrix: [
      [
        267,
        18
      ],
      [
        18,
        267
      ]
    ]
  },
  bilstm: {
    accuracy: 0.77,
    precision: 0.82,
    recall: 0.71,
    f1_score: 0.76,
    confusion_matrix: [
      [
        241,
        44
      ],
      [
        82,
        203
      ]
    ]
  },
  mobilenetv2: {
    accuracy: 0.91,
    precision: 0.90,
    recall: 0.91,
    f1_score: 0.91,
    confusion_matrix: [
      [
        259,
        26
      ],
      [
        28,
        257
      ]
    ]
  },
  resnet50: {
    accuracy: 0.76,
    precision: 0.71,
    recall: 0.88,
    f1_score: 0.78,
    confusion_matrix: [
      [
        183,
        102
      ],
      [
        33,
        252
      ]
    ]
  },
  gru: {
    accuracy: 0.50,
    precision: 0.49,
    recall: 0.51,
    f1_score: 0.50,
    confusion_matrix: [
      [
        285,
        0
      ],
      [
        285,
        0
      ]
    ]

  
},
}

// A component to display a single model's graph set
const ModelGraphCard = ({ title, graphImage }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <img
      src={graphImage}
      alt={`${title} Performance Graphs`}
      className="w-full h-auto rounded-lg"
    />
  </div>
);

function SpectrogramsPage() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("spectrograms");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a .wav file first!");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // This URL is a placeholder and should be updated to a live backend
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Convert metrics data to a chart-friendly format
  const chartData = Object.entries(metricsData).map(([model, values]) => ({
    model: model.toUpperCase(),
    Accuracy: values.accuracy,
    Precision: values.precision,
    Recall: values.recall,
    F1: values.f1_score,
    CM:values.confusion_matrix
  }));

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4 shadow-xl">
        <h2 className="text-2xl font-extrabold text-center mb-8 tracking-wider">
          Dashboard
        </h2>
        
        {/* Navigation buttons */}
        <button
          onClick={() => setView("spectrograms")}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
            view === "spectrograms"
              ? "bg-blue-600 text-white shadow-md transform scale-105"
              : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 7.5c-.3 0-.5.2-.5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 1-1 0V7.5c0-.3-.2-.5-.5-.5H1.5c-.3 0-.5.2-.5.5v11c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V8c0-.3-.2-.5-.5-.5zM2 9v9h16V9H2zm16-4V2.5c0-.3-.2-.5-.5-.5H1.5c-.3 0-.5.2-.5.5V5h17zM6 3H4v2h2V3zm4 0H8v2h2V3zm4 0h-2v2h2V3zm4 0h-2v2h2V3zM3 13h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 16h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 19h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
          <span>Spectrograms</span>
        </button>

        <button
          onClick={() => setView("predictions")}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
            view === "predictions"
              ? "bg-green-600 text-white shadow-md transform scale-105"
              : "bg-gray-700 text-gray-200 hover:bg-green-500 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.5c-4.142 0-7.5 3.358-7.5 7.5S7.858 16.5 12 16.5c4.142 0 7.5-3.358 7.5-7.5S16.142 1.5 12 1.5zm-5 7.5c0-.3.2-.5.5-.5h4.793l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 10H7.5c-.3 0-.5-.2-.5-.5z"/></svg>
          <span>Predictions</span>
        </button>

        <button
          onClick={() => setView("metrics")}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium ${
            view === "metrics"
              ? "bg-purple-600 text-white shadow-md transform scale-105"
              : "bg-gray-700 text-gray-200 hover:bg-purple-500 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a.5.5 0 0 0-.5.5V9H2.5a.5.5 0 0 0 0 1H9v6.5a.5.5 0 0 0 1 0V10h6.5a.5.5 0 0 0 0-1H10V3a.5.5 0 0 0-.5-.5z"/></svg>
          <span>Metrics</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Test Parkinson Prediction
        </h1>

        {/* Upload section - Always visible */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
          <label htmlFor="file-upload" className="flex-1 text-gray-700 font-medium">
            Select a `.wav` file to upload:
          </label>
          <input
            id="file-upload"
            type="file"
            accept="audio/wav"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="flex-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`flex-shrink-0 px-6 py-2 rounded-full font-bold text-white transition-all duration-200 ${
              loading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
            }`}
          >
            {loading ? "Uploading..." : "Upload & Predict"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Spectrograms View */}
        {results && view === "spectrograms" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.chunks.map((chunk, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-4 text-center"
              >
                <h2 className="font-semibold text-gray-800 mb-2">
                  Chunk {chunk.chunk}
                </h2>
                <img
                  src={`data:image/png;base64,${chunk.spectrogram}`}
                  alt={`Spectrogram of chunk ${chunk.chunk}`}
                  className="w-full h-auto rounded-lg shadow-inner"
                />
              </div>
            ))}
          </div>
        )}

        {/* Predictions View */}
        {results && view === "predictions" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Prediction Results
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                      Model
                    </th>
                    <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                      Prediction
                    </th>
                    <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.chunks[0] &&
                    Object.entries(results.chunks[0].predictions).map(
                      ([model, pred]) => (
                        <tr key={model} className="hover:bg-gray-50 transition-colors">
                          <td className="border-b p-4 font-semibold text-gray-700">
                            {model.toUpperCase()}
                          </td>
                          <td className="border-b p-4 text-gray-600">
                            {pred.label}
                          </td>
                          <td className="border-b p-4 text-gray-600">
                            {pred.score?.toFixed(4) ?? "—"}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Metrics View */}
        {view === "metrics" && (
          <div className="space-y-10">
            {/* Metrics Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Model Metrics
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Accuracy" fill="#3b82f6" name="Accuracy" />
                    <Bar dataKey="Precision" fill="#10b981" name="Precision" />
                    <Bar dataKey="Recall" fill="#f59e0b" name="Recall" />
                    <Bar dataKey="F1" fill="#ef4444" name="F1 Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Detailed Metrics Table
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                        Model
                      </th>
                      <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                        Accuracy
                      </th>
                      <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                        Precision
                      </th>
                      <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                        Recall
                      </th>
                      <th className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-600">
                        F1 Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(metricsData).map(([model, values]) => (
                      <tr key={model} className="hover:bg-gray-50 transition-colors">
                        <td className="border-b p-4 font-semibold text-gray-700">
                          {model.toUpperCase()}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {values.accuracy.toFixed(4)}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {values.precision.toFixed(4)}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {values.recall.toFixed(4)}
                        </td>
                        <td className="border-b p-4 text-gray-600">
                          {values.f1_score.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Confusion Matrices Section */}
<div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Confusion Matrices
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Object.entries(metricsData).map(([model, values]) => (
      <div key={model} className="text-center">
        <h3 className="text-lg font-semibold mb-2">{model.toUpperCase()}</h3>
        <ConfusionMatrix matrix={values.confusion_matrix} />
      </div>
    ))}
  </div>
</div>


            {/* Model Graphs Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Model Performance Graphs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModelGraphCard
                  title="CNN-LSTM Performance"
                  graphImage={cnnLstmGraph}
                />
                <ModelGraphCard
                  title="BiLSTM Performance"
                  graphImage={bilstmGraph}
                />
                <ModelGraphCard
                  title="MobileNetV2 Performance"
                  graphImage={mobilenetGraph}
                />
                <ModelGraphCard
                  title="ResNet50 Performance"
                  graphImage={resnetGraph}
                />
                <ModelGraphCard
                  title="GRU Performance"
                  graphImage={gruGraph}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpectrogramsPage;