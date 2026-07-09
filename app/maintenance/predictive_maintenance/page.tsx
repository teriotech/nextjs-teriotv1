"use client";

import React, { useState } from "react";

// interface untuk tipe data schedule list
interface PMScheduleItem {
  id: string;
  jobName: string;
  duration: string;
  description: string;
  formCode: string;
  formName: string;
  tags: ("Active" | "Weekly" | "Monthly" | "Electrical" | "Production" | "Mechanical")[];
  pic: string;
  spareparts: string;
  tools: string;
  area: string;
  executionDate: string;
  repeaterDays: number;
  scheduleInputDate: string;
}

export default function PreventiveMaintenancePage() {
  // State Filter & Navigasi Kalender
  const [currentMonth, setCurrentMonth] = useState("July 2026");
  
  // State untuk Filter List di bagian bawah
  const [filterArea, setFilterArea] = useState("All Area");
  const [filterTag, setFilterTag] = useState("All Tag");
  const [filterFrequency, setFilterFrequency] = useState("All Frequency");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk mengontrol pop-up modal Edit Form (PM Result Approval Checklist)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<PMScheduleItem | null>(null);

  // --- DATA DUMMY CALENDAR SCHEDULE ---
  const calendarEvents: Record<number, { label: string; type: "electrical" | "production" | "mechanical" }[]> = {
    8: [
      { label: "[Electrical]PM RABU (E-RUN) : UTILITY", type: "electrical" },
      { label: "[Electrical]TRANSFORMER", type: "electrical" },
      { label: "[Electrical]Weekly PM ,Mixer Mortar", type: "electrical" },
      { label: "[Electrical]Weekly PM,Mortar Machine", type: "electrical" },
      { label: "[Mechanical]PM MONTHLY : ROTARY VALVE 272 (MORTAR PLANT)", type: "mechanical" },
    ],
    9: [
      { label: "[Electrical]Weekly PM,Packaging mortar", type: "electrical" },
      { label: "[Electrical]Weekly PM,Screw Cement Mortar", type: "electrical" },
      { label: "[Mechanical]PM JUMAT (M-RUN) : UTILITY", type: "mechanical" },
      { label: "[Mechanical]PM KAMIS (M-RUN) : UTILITY", type: "mechanical" },
      { label: "[Mechanical]PM MONTHLY : ASSY SCREW CEMENT", type: "mechanical" },
      { label: "[Mechanical]PM MONTHLY : GENERATOR SYSTEM", type: "mechanical" },
    ],
    10: [
      { label: "[Electrical]Monthly PM: Fire Alarm ( Office )", type: "electrical" },
      { label: "[Electrical]PM RUN: UTILITY", type: "electrical" },
      { label: "[Electrical]Weekly PM,Rotary cement 350", type: "electrical" },
      { label: "[Electrical]Weekly PM,Rotary Valve 272", type: "electrical" },
      { label: "[Mechanical]PM MONTHLY : MIXER (MORTAR PLANT)", type: "mechanical" },
    ],
    12: [
      { label: "[Production]PM MONTHLY : APAR - TRAFO", type: "production" }
    ],
    13: [
      { label: "[Mechanical]PM MONTHLY : Belt conveyor Mortar", type: "mechanical" },
      { label: "[Mechanical]PM MONTHLY : MORTAR SCREW CONVEYOR 02", type: "mechanical" }
    ],
    14: [
      { label: "[Electrical]PM (E-RUN) : UTILITY", type: "electrical" },
      { label: "[Mechanical]PM MONTHLY : AIR COMPRESSOR 01", type: "mechanical" },
      { label: "[Mechanical]PM MONTHLY : DUST COLLECTOR MORTAR", type: "mechanical" },
      { label: "[Mechanical]PM SELASA (M-RUN) : UTILITY", type: "mechanical" },
      { label: "[Production]PM MONTHLY : Eye Wash MORTAR", type: "production" },
      { label: "[Production]PM MONTHLY : Eye Wash TPS", type: "production" },
    ],
    15: [
      { label: "[Electrical]PM : Incoming Cubicle PLN 20 KV", type: "electrical" },
      { label: "[Electrical]SOLAR CELL SYSTEM", type: "electrical" },
      { label: "[Mechanical]PM MONTHLY : AIR COMPRESSOR 02", type: "mechanical" },
      { label: "[Mechanical]PM MONTHLY : AIR DRYER 01", type: "mechanical" },
      { label: "[Production]PM MONTHLY : APAR-RAW MATERIAL LUAR 1", type: "production" },
    ],
    16: [
      { label: "[Electrical]PM Weekly: SCREW Conveyor CaCO3", type: "electrical" }
    ]
  };

  // --- DATA DUMMY SCHEDULE SETTING LIST ---
  const scheduleItems: PMScheduleItem[] = [
    {
      id: "1",
      jobName: "SOLAR CELL SYSTEM",
      duration: "60mins",
      description: "Periksa kondisi Solar Panel dan ruangan",
      formCode: "UTI-PV-01",
      formName: "[SOLAR CELL SYSTEM]",
      tags: ["Active", "Weekly", "Electrical"],
      pic: "no data",
      spareparts: "no data",
      tools: "Thermogun [ 62MAX+ ], Kuas/painting[ 2 ]",
      area: "Rawmat",
      executionDate: "Wed 15-07-2026",
      repeaterDays: 7,
      scheduleInputDate: "15-07-2026"
    },
    {
      id: "2",
      jobName: "PM SOLAR CELL SYSTEM",
      duration: "60mins",
      description: "Periksa kondisi PV panel dan inverter",
      formCode: "UTI-PV-01",
      formName: "[SOLAR CELL SYSTEM]",
      tags: ["Active", "Monthly", "Electrical"],
      pic: "no data",
      spareparts: "no data",
      tools: "Tang Ampere / Clamp Meter[ 303 ], Thermogun [ 62MAX+ ], Kuas/painting[ 2 ]",
      area: "Rawmat",
      executionDate: "Tue 21-07-2026",
      repeaterDays: 28,
      scheduleInputDate: "21-07-2026"
    },
    {
      id: "3",
      jobName: "APAR CHARGER FORKLIFT",
      duration: "mins",
      description: "Inspeksi rutin bulanan kualitas dan kondisi APAR",
      formCode: "UTI-APAR-40",
      formName: "[Charger Forklift]",
      tags: ["Active", "Monthly", "Production"],
      pic: "no data",
      spareparts: "no data",
      tools: "no data",
      area: "Utility",
      executionDate: "Wed 22-07-2026",
      repeaterDays: 28,
      scheduleInputDate: "22-07-2026"
    },
    {
      id: "4",
      jobName: "Weekly PM,Packaging mortar",
      duration: "mins",
      description: "Pengecekan rutin",
      formCode: "RMA-BR-001",
      formName: "[Packaging Mortar]",
      tags: ["Active", "Weekly", "Electrical"],
      pic: "no data",
      spareparts: "no data",
      tools: "Kuas/cleaning[ 4 ], Tang Ampere / Clamp Meter[ 303 ]",
      area: "Rawmat",
      executionDate: "Fri 10-07-2026",
      repeaterDays: 7,
      scheduleInputDate: "10-07-2026"
    }
  ];

  const getEventBadgeClass = (type: "electrical" | "production" | "mechanical") => {
    switch (type) {
      case "electrical":
        return "bg-green-700/80 text-white border-green-600";
      case "production":
      case "mechanical":
      default:
        return "bg-blue-600/80 text-white border-blue-500";
    }
  };

  const getTagClass = (tag: string) => {
    switch (tag) {
      case "Active": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "Weekly": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Monthly": return "bg-teal-500/10 text-teal-400 border-teal-500/30";
      case "Electrical": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Production": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  // Fungsi saat tombol edit di klik
  const handleEditClick = (item: PMScheduleItem) => {
    setSelectedJob(item);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] p-4 sm:p-6 text-zinc-200 font-sans relative">
      
      {/* HEADER BAR */}
      <div className="w-full border-b border-white/[0.05] pb-3 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h2 className="text-lg font-bold tracking-tight text-white uppercase">
            All Checklist <span className="text-xs text-zinc-500 lowercase font-normal">Show all Checklists</span>
          </h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-600 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.03]">FD MTN 01 002</span>
      </div>

      {/* UI CALENDAR SCHEDULE */}
      <div className="w-full bg-[#09090b]/80 border border-white/[0.05] rounded-xl shadow-xl overflow-hidden p-4 mb-8">
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4">
          <h3 className="text-xl font-extrabold text-white tracking-wide font-mono">{currentMonth}</h3>
          <div className="flex items-center gap-1">
            <button className="bg-zinc-900 border border-white/[0.08] hover:border-[#00F0FF]/40 text-zinc-300 text-xs px-3 py-1 rounded transition-all">today</button>
            <button className="bg-zinc-900 border border-white/[0.08] hover:bg-white/[0.05] text-zinc-300 text-xs px-2 py-1 rounded font-bold">{"<"}</button>
            <button className="bg-zinc-900 border border-white/[0.08] hover:bg-white/[0.05] text-zinc-300 text-xs px-2 py-1 rounded font-bold">{">"}</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[1000px] border border-white/[0.05] rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-black/40 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-400 border-b border-white/[0.05] py-2">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid grid-cols-7 bg-zinc-950/30 divide-x divide-y divide-white/[0.05] border-b border-white/[0.05]">
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">5</span></div>
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">6</span></div>
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">7</span></div>
              
              <div className="min-h-[140px] p-1 bg-amber-500/[0.02]">
                <span className="text-xs text-zinc-400 font-mono p-1 block font-bold">8</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[8]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`} title={ev.label}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1 bg-amber-500/[0.02]">
                <span className="text-xs text-zinc-400 font-mono p-1 block font-bold">9</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[9]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`} title={ev.label}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block font-bold">10</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[10]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`} title={ev.label}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">11</span></div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block">12</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[12]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`}>{ev.label}</div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block">13</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[13]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`}>{ev.label}</div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block font-bold">14</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[14]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`}>{ev.label}</div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block font-bold">15</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[15]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`}>{ev.label}</div>
                  ))}
                </div>
              </div>

              <div className="min-h-[140px] p-1">
                <span className="text-xs text-zinc-400 font-mono p-1 block">16</span>
                <div className="space-y-0.5 mt-1">
                  {calendarEvents[16]?.map((ev, i) => (
                    <div key={i} className={`text-[9px] px-1.5 py-0.5 rounded border leading-tight truncate font-mono ${getEventBadgeClass(ev.type)}`}>{ev.label}</div>
                  ))}
                </div>
              </div>
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">17</span></div>
              <div className="min-h-[140px] p-1"><span className="text-xs text-zinc-600 font-mono p-1">18</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE CONFIGURATION SETTING & LIST */}
      <div className="w-full bg-[#09090b]/80 border border-white/[0.05] rounded-xl shadow-xl p-5">
        
        {/* FILTER CONTROLLERS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <input
            type="date"
            placeholder="from Date"
            className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
          />
          <input
            type="date"
            placeholder="to Date"
            className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
          />
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
          >
            <option>All Area</option>
            <option>Rawmat</option>
            <option>Utility</option>
          </select>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
          >
            <option>All Tag</option>
            <option>Electrical</option>
            <option>Production</option>
          </select>
          <select
            value={filterFrequency}
            onChange={(e) => setFilterFrequency(e.target.value)}
            className="bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
          >
            <option>All Frequency</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        {/* SEARCH BAR ROW */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job name or description..."
            className="flex-1 bg-black/50 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors placeholder:text-zinc-600"
          />
          <button className="bg-gradient-to-r from-[#0066FF] to-[#0044CC] hover:shadow-[0_0_15px_rgba(0,102,255,0.4)] text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1">
            🔍 Search
          </button>
        </div>

        <div className="text-[11px] text-zinc-500 font-mono mb-3 italic">found 9618 data.</div>

        {/* DATA LIST TABLE */}
        <div className="w-full overflow-x-auto border border-white/[0.05] rounded-xl bg-black/20">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.05] text-zinc-400 font-bold text-xs tracking-wider uppercase select-none">
                <th className="p-4 w-1/3">Job Name</th>
                <th className="p-4 w-1/4">Info</th>
                <th className="p-4 w-1/6">Area/Execution</th>
                <th className="p-4 text-center w-1/5">Action/Schedule</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/[0.04] text-xs font-medium text-zinc-300">
              {scheduleItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                  
                  {/* KOLOM 1: JOB NAME & BADGES */}
                  <td className="p-4 valign-top space-y-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${getTagClass(tag)}`}>
                          {tag}
                        </span>
                      ))}
                      <span className="text-zinc-200 font-bold ml-1">{item.jobName}</span>
                      <span className="text-zinc-500 font-mono text-[10px]">/ {item.duration}</span>
                    </div>
                    <p className="text-zinc-400 font-sans text-[11px] leading-relaxed">{item.description}</p>
                    <div className="text-[10px] text-zinc-500 font-mono leading-tight">
                      <span className="text-zinc-600 font-bold">Form(s):</span><br />
                      {item.id}. {item.formCode}{item.formName}
                    </div>
                  </td>

                  {/* KOLOM 2: INFO */}
                  <td className="p-4 text-[11px] font-mono text-zinc-400 space-y-1">
                    <div><span className="text-zinc-500 font-sans font-bold">PIC(s):</span> {item.pic}</div>
                    <div><span className="text-zinc-500 font-sans font-bold">Sparepart(s):</span> {item.spareparts}</div>
                    <div className="leading-snug"><span className="text-zinc-500 font-sans font-bold">Tool(s):</span> {item.tools}</div>
                  </td>

                  {/* KOLOM 3: AREA / EXECUTION */}
                  <td className="p-4 text-[11px] text-zinc-400 space-y-0.5 font-mono">
                    <div className="text-white font-sans font-bold">{item.area}</div>
                    <div>{item.executionDate}</div>
                    <div><span className="text-zinc-500 font-sans font-bold">Repeater:</span> {item.repeaterDays} days</div>
                  </td>

                  {/* KOLOM 4: ACTION CONTROLS */}
                  <td className="p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        {/* TOMBOL EDIT MODIFIKASI: Memicu pembukaan Pop-up */}
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 p-1.5 rounded text-white transition-colors" 
                          title="Edit Form"
                        >
                          ✏️
                        </button>
                        <button className="bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 p-1.5 rounded text-white transition-colors" title="Settings">
                          🔧
                        </button>
                        <button className="bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 p-1.5 rounded text-white transition-colors" title="Delete">
                          🗑️
                        </button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 p-1.5 rounded text-white transition-colors" title="Alert">
                          ⚠️
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1 w-full max-w-[160px]">
                        <input
                          type="text"
                          defaultValue={item.scheduleInputDate}
                          className="w-full bg-black/60 border border-white/[0.1] rounded text-[10px] px-2 py-0.5 text-zinc-400 font-mono text-center focus:outline-none"
                        />
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] px-2 py-1 rounded tracking-wider uppercase transition-colors">
                          Set
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM PAGINATION CONTROLLER */}
        <div className="mt-4 flex justify-start items-center gap-1 font-mono text-[10px]">
          <button className="px-2 py-1 bg-blue-600 text-white font-bold rounded">1</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">2</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">3</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">4</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">5</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">Next</button>
          <button className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.05] rounded text-zinc-400">Last</button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POP-UP MODAL MODIFICATION (Screenshot Terbaru: PM Result Approval Checklist) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-5xl bg-[#0d0d0e] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden my-8 text-zinc-300">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 px-6 py-4 border-b border-white/[0.05] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✔</span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  PM Result Approval
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] w-7 h-7 flex items-center justify-center rounded-full transition-all text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Checklist Form */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Top Header Filter Mockup inside Modal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-black/30 p-2 rounded-lg border border-white/[0.03] text-[11px]">
                <div className="flex items-center gap-1"><span className="text-zinc-500">Area:</span> <span className="text-zinc-300 font-bold">{selectedJob?.area || "All Area"}</span></div>
                <div className="flex items-center gap-1"><span className="text-zinc-500">Tag:</span> <span className="text-zinc-300 font-bold">Electrical</span></div>
                <div className="flex items-center gap-1"><span className="text-zinc-500">Frequency:</span> <span className="text-zinc-300 font-bold">Monthly</span></div>
              </div>

              {/* Main Machine Information Table Card */}
              <div className="w-full border border-white/[0.06] rounded-lg overflow-hidden font-sans text-xs bg-black/40">
                <div className="bg-white/[0.02] border-b border-white/[0.06] p-3 text-center text-white font-bold tracking-wide text-sm">
                  Mortar Screw Conveyor CaCO3
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/[0.06] border-b border-white/[0.06] bg-zinc-900/30">
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">Code:</span><span className="font-mono text-zinc-300 font-bold">{selectedJob?.formCode || "RMA-SC-011"}</span></div>
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">Rev:</span><span className="font-mono text-zinc-400">REV.07-10-2025</span></div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/[0.06] border-b border-white/[0.06]">
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">Dept/Type:</span><span className="text-zinc-300">Electrical</span></div>
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">Frequency:</span><span className="text-zinc-300">Monthly</span></div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/[0.06] bg-zinc-900/10">
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">Submit Time:</span><span className="font-mono text-zinc-400">2026-07-08 20:03:15</span></div>
                  <div className="p-2.5 flex justify-between"><span className="text-zinc-500">PIC:</span><span className="text-cyan-400 font-mono font-bold">90720 (Tyas Ramadhan)</span></div>
                </div>
              </div>

              {/* Safety Sign and APD Icons Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-zinc-950/60 border border-white/[0.04] rounded-xl">
                {/* Hazard Signs */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1 text-[10px] text-amber-400 font-bold">
                    ⚠️ Tangan Terjepit
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1 text-[10px] text-amber-400 font-bold">
                    ⚙️ Terjepit Komponen Berputar
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1 text-[10px] text-amber-400 font-bold">
                    ⚡ Tersengat Listrik
                  </div>
                </div>
                {/* APD Requirements */}
                <div className="flex flex-wrap gap-2 justify-center text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                  <span className="bg-zinc-900 border border-white/[0.05] px-2 py-1 rounded flex items-center gap-1">🪖 Helm</span>
                  <span className="bg-zinc-900 border border-white/[0.05] px-2 py-1 rounded flex items-center gap-1">🥾 Sepatu Safety</span>
                  <span className="bg-zinc-900 border border-white/[0.05] px-2 py-1 rounded flex items-center gap-1">🧤 Sarung Tangan</span>
                  <span className="bg-zinc-900 border border-white/[0.05] px-2 py-1 rounded flex items-center gap-1">😷 Masker</span>
                </div>
              </div>

              {/* Checklist Parameters Form Table */}
              <div className="w-full overflow-x-auto border border-white/[0.06] rounded-xl bg-black/20 text-xs">
                <table className="w-full border-collapse min-w-[800px] text-left">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/[0.06] text-zinc-400 font-bold tracking-wide select-none">
                      <th className="p-3 w-[5%]">No</th>
                      <th className="p-3 w-[35%]">Parameter</th>
                      <th className="p-3 w-[25%]">Standard</th>
                      <th className="p-3 w-[25%]">Answer Type / Value</th>
                      <th className="p-3 w-[10%] text-center">Observe</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.05]">
                    
                    {/* SECTION 1: Chain Hoist */}
                    <tr className="bg-white/[0.01] font-bold text-zinc-400 border-b border-white/[0.05]">
                      <td colSpan={5} className="p-2.5 pl-3 text-cyan-400">1. Chain Hoist 3 ton</td>
                    </tr>
                    <tr className="bg-amber-500/[0.03] hover:bg-amber-500/[0.05] transition-colors">
                      <td className="p-3 font-mono text-center">1</td>
                      <td className="p-3">
                        <div className="font-bold text-zinc-200">Ampere</div>
                        <div className="text-[10px] text-zinc-500 font-mono">Min: 1.00 Max: 5.00 Unit: Ampere</div>
                      </td>
                      <td className="p-3 text-zinc-400">Max 5 Ampere</td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            defaultValue="8,6" 
                            className="w-full max-w-[120px] bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono font-bold px-2 py-1 rounded focus:outline-none" 
                          />
                          <span className="block text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded w-max uppercase tracking-wider">Abnormal</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <input type="checkbox" defaultChecked className="rounded accent-blue-600 scale-110" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-center">2</td>
                      <td className="p-3 font-medium text-zinc-300">Limit switch</td>
                      <td className="p-3 text-zinc-400">Berfungsi Normal</td>
                      <td className="p-3 flex items-center gap-3 pt-4">
                        <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="limit_switch" defaultChecked className="accent-emerald-500" /> YES</label>
                        <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="limit_switch" className="accent-rose-500" /> NO</label>
                      </td>
                      <td className="p-3 text-center"><input type="checkbox" className="rounded scale-110" /></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-center">3</td>
                      <td className="p-3 font-medium text-zinc-300">Tombol berfungsi normal</td>
                      <td className="p-3 text-zinc-400">Responsif</td>
                      <td className="p-3 flex items-center gap-3 pt-4">
                        <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="tombol" defaultChecked className="accent-emerald-500" /> YES</label>
                        <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="tombol" className="accent-rose-500" /> NO</label>
                      </td>
                      <td className="p-3 text-center"><input type="checkbox" className="rounded scale-110" /></td>
                    </tr>

                    {/* SECTION 2: Motor Screw conveyor */}
                    <tr className="bg-white/[0.01] font-bold text-zinc-400 border-b border-white/[0.05]">
                      <td colSpan={5} className="p-2.5 pl-3 text-cyan-400">2. Motor Screw conveyor</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-center">1</td>
                      <td className="p-3">
                        <div className="font-bold text-zinc-200">Ampere motor</div>
                        <div className="text-[10px] text-zinc-500 font-mono">Min: 2.00 Max: 8.00 Unit: Ampere</div>
                      </td>
                      <td className="p-3 text-zinc-400">2-8A</td>
                      <td className="p-3">
                        <input type="text" defaultValue="7,5" className="w-full max-w-[120px] bg-black/40 border border-white/[0.1] text-zinc-300 font-mono px-2 py-1 rounded focus:outline-none" />
                      </td>
                      <td className="p-3 text-center"><input type="checkbox" className="rounded scale-110" /></td>
                    </tr>

                    {/* SECTION 4: Vibrator tank */}
                    <tr className="bg-white/[0.01] font-bold text-zinc-400 border-b border-white/[0.05]">
                      <td colSpan={5} className="p-2.5 pl-3 text-cyan-400">4. Vibrator tank</td>
                    </tr>
                    <tr className="bg-amber-500/[0.03] hover:bg-amber-500/[0.05] transition-colors">
                      <td className="p-3 font-mono text-center">1</td>
                      <td className="p-3">
                        <div className="font-bold text-zinc-200">Ampere motor</div>
                        <div className="text-[10px] text-zinc-500 font-mono">Min: 1.00 Max: 3.50 Unit: Ampere</div>
                      </td>
                      <td className="p-3 text-zinc-400">1-3.5 Amp</td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            defaultValue="4,6" 
                            className="w-full max-w-[120px] bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono font-bold px-2 py-1 rounded focus:outline-none" 
                          />
                          <span className="block text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded w-max uppercase tracking-wider">Abnormal</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <input type="checkbox" defaultChecked className="rounded accent-blue-600 scale-110" />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

            {/* Modal Footer (Action Buttons) */}
            <div className="px-6 py-4 bg-zinc-950 border-t border-white/[0.05] flex justify-end items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-400 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Observation flag submitted for: ${selectedJob?.jobName}`);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5"
              >
                🔍 Observe
              </button>
              <button 
                onClick={() => {
                  alert(`Form approval check completed for Form: ${selectedJob?.formCode}`);
                  setIsModalOpen(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/50"
              >
                ✔ Check & Approve
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}