// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Button } from '../components/ui/button';

// export default function QuestionDetails() {
//   const { id } = useParams<{ id: string }>();

//   // Fetch question details based on id
//   const question = {
//     title: "Two Sum",
//     difficulty: "Easy",
//     status: "Solved",
//     attempts: [
//       { date: "2023-12-01", status: "Solved", notes: "Used hash map for O(n) solution" },
//       { date: "2023-11-15", status: "Used Hints", notes: "Struggled with optimizing brute force" },
//     ],
//     upcomingReviews: [
//       { date: "2023-12-15", reason: "Periodic Review" },
//     ],
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-white">{question.title}</h1>
//         <div className="flex items-center space-x-4 mt-2">
//           <span className={`px-2 py-1 rounded text-sm font-semibold ${getDifficultyColor(question.difficulty)}`}>
//             {question.difficulty}
//           </span>
//           <span className="bg-[#1E1E1E] px-2 py-1 rounded text-sm">{question.status}</span>
//         </div>
//       </header>

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-white mb-4">Question History</h2>
//         <div className="space-y-4">
//           {question.attempts.map((attempt, index) => (
//             <div key={index} className="bg-[#1E1E1E] p-4 rounded-lg">
//               <p className="text-white">{attempt.date} - {attempt.status}</p>
//               <p className="text-gray-400 mt-2">{attempt.notes}</p>
//               <Button className="mt-4 bg-[#007BFF] hover:bg-[#0056b3] text-white">
//                 Mark as Reviewed
//               </Button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Schedule</h2>
//         <div className="space-y-4">
//           {question.upcomingReviews.map((review, index) => (
//             <div key={index} className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center">
//               <div>
//                 <p className="text-white">{review.date}</p>
//                 <p className="text-gray-400">{review.reason}</p>
//               </div>
//               <div className="space-x-2">
//                 <Button variant="outline" className="border-gray-700 text-gray-300">
//                   Reschedule
//                 </Button>
//                 <Button variant="outline" className="border-gray-700 text-gray-300">
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// function getDifficultyColor(difficulty: string) {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'bg-[#4CAF50] text-white';
//     case 'medium': return 'bg-[#FFC107] text-black';
//     case 'hard': return 'bg-[#F44336] text-white';
//     default: return 'bg-gray-500 text-white';
//   }
// }

