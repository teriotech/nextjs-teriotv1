"use client";

import React, { useState, useEffect } from "react";

// Struktur data dummy untuk tabel agar sesuai dengan screenshot
interface TaskEntry {
  no: number;
  waktu: string;
  jobDescription: string;
  team: string;
  submitReport: string;
}

export default function MyTaskTodayPage() {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // --- BAGIAN YANG DITAMBAHKAN: State untuk User Login ---
  const [userName, setUserName] = useState<string>("Memuat...");
  const [userRole, setUserRole] = useState<string>("Memuat...");

  useEffect(() => {
    // Mengambil data user dari localStorage saat komponen dimuat
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Menggunakan Full Name (name) dan Role (authority) dari layout.tsx
          setUserName(parsedUser.name || "Unknown User");
          setUserRole(parsedUser.authority || "User");
        } catch (error) {
          console.error("Gagal membaca data user", error);
          setUserName("Unknown User");
          setUserRole("User");
        }
      } else {
        setUserName("Unknown User");
        setUserRole("User");
      }
    }
  }, []);
  // -------------------------------------------------------

  // Data dummy (bisa dikosongkan `[]` jika ingin persis memunculkan "No data available in table")
  const [tasks, setTasks] = useState<TaskEntry[]>([]);

  // Filter data berdasarkan search query
  const filteredTasks = tasks.filter((task) =>
    task.jobDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#050505] p-4 sm:p-6 lg:p-8 text-zinc-200">
      
      {/* Title Bar Utama */}
      <div className="w-full border-b border-white/[0.05] pb-4 mb-6 flex items-baseline gap-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          My Task <span className="text-zinc-500 font-medium text-lg sm:text-xl">(0)</span>
        </h2>
        <span className="text-xs sm:text-sm text-zinc-500 font-mono">
          User: <span className="text-[#00F0FF] font-semibold">{userName}</span> | Role: <span className="text-[#00FF66] font-semibold">{userRole}</span>
        </span>
      </div>

      {/* Main Container dengan Glassmorphism / Tema Teriot */}
      <div className="w-full bg-[#09090b]/60 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden">
        
        {/* Glow Effect Background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00F0FF]/5 blur-[80px] rounded-full pointer-events-none"></div>

        {/* SECTION: My JOB Today Dashboard */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="border border-dashed border-[#00F0FF]/30 rounded-xl bg-black/40 p-6 sm:p-8 shadow-inner">
            <h3 className="text-center text-lg sm:text-xl font-extrabold tracking-wide text-white uppercase mb-6">
              My JOB Today
            </h3>
            
            <div className="space-y-4 font-mono text-sm">
              {/* Custom Job */}
              <div className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                <span className="px-3 py-1 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  Custom Job
                </span>
                <span className="text-lg font-bold text-white">0</span>
              </div>

              {/* Routine Job */}
              <div className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                <span className="px-3 py-1 bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  Routine Job
                </span>
                <span className="text-lg font-bold text-white">0</span>
              </div>

              {/* PM (Weekly & Monthly) */}
              <div className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  PM (Weekly & Monthly)
                </span>
                <span className="text-lg font-bold text-white">0</span>
              </div>

              {/* Overhaul Yearly (Dimodifikasi) */}
              <div className="flex justify-between items-center pt-1">
                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-md text-xs font-bold uppercase tracking-wider">
                  Overhaul Yearly
                </span>
                <span className="text-lg font-bold text-white">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Data Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 text-xs font-medium">
          {/* Entries Controller */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-zinc-400">entries</span>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors placeholder:text-zinc-600 w-full sm:w-48"
              placeholder="Cari tugas..."
            />
          </div>
        </div>

        {/* SECTION: Interactive Responsive Table */}
        <div className="w-full overflow-x-auto border border-white/[0.05] rounded-xl bg-black/20">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gradient-to-r from-[#0066FF]/80 to-[#0044CC]/80 text-white font-bold text-xs uppercase tracking-wider select-none">
                <th className="p-4 border-r border-white/[0.05] w-16 text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-[#00F0FF]">
                    No. <span>⇅</span>
                  </div>
                </th>
                <th className="p-4 border-r border-white/[0.05] w-32">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#00F0FF]">
                    Waktu <span>⇅</span>
                  </div>
                </th>
                <th className="p-4 border-r border-white/[0.05]">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#00F0FF]">
                    Job & Description <span>⇅</span>
                  </div>
                </th>
                <th className="p-4 border-r border-white/[0.05] w-40">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#00F0FF]">
                    Team <span>⇅</span>
                  </div>
                </th>
                <th className="p-4 w-40 text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-[#00F0FF]">
                    Submit Report <span>⇅</span>
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody className="text-xs font-medium text-zinc-300 divide-y divide-white/[0.05]">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.no} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-center font-mono border-r border-white/[0.05]">{task.no}</td>
                    <td className="p-4 font-mono border-r border-white/[0.05]">{task.waktu}</td>
                    <td className="p-4 border-r border-white/[0.05] text-white">{task.jobDescription}</td>
                    <td className="p-4 border-r border-white/[0.05]">{task.team}</td>
                    <td className="p-4 text-center">{task.submitReport}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500 italic tracking-wide">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SECTION: Pagination Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-medium text-zinc-400">
          <div>
            Showing {filteredTasks.length} to {filteredTasks.length} of {filteredTasks.length} entries
          </div>
          
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              disabled
              className="px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-l-lg text-zinc-600 cursor-not-allowed select-none"
            >
              Previous
            </button>
            <button
              disabled
              className="px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-r-lg text-zinc-600 cursor-not-allowed select-none"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}