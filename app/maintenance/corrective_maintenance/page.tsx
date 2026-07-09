"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Settings, 
  Trash2, 
  X, 
  FileText, 
  ArrowLeft,
  Calendar
} from "lucide-react";

interface ProjectJobItem {
  id: string;
  title: string;
  timeRequest: string;
  description: string[];
  workPermit: string[];
  spareparts: string;
  tools: string;
  department?: string;
}

export default function ProjectJobPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<ProjectJobItem | null>(null);
  
  // State Form Modal Utama (Add / Edit)
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [workPermits, setWorkPermits] = useState({
    hotWork: false,
    workAtHigh: false,
    confinedSpace: false,
    digging: false,
    electrical: false,
  });

  // Data State
  const [jobs, setJobs] = useState<ProjectJobItem[]>([
    {
      id: "1",
      title: "Perbaikan cable",
      timeRequest: "2026-07-09 20:53:09",
      description: ["Tarik Kabel dari arah sana kesini", "Cleaning Panel"],
      workPermit: ["Hot Work"],
      spareparts: "no data",
      tools: "no data",
      department: "Electrical"
    }
  ]);

  // Handle Buka Modal Tambah Data Baru
  const handleOpenAddModal = () => {
    setEditingJobId(null);
    setIsModalOpen(true);
  };

  // Handle Buka Modal Edit Data Terpilih
  const handleOpenEditModal = (job: ProjectJobItem) => {
    setEditingJobId(job.id);
    setJobTitle(job.title);
    setDescription(job.description.join("\n"));
    setDepartment(job.department || "");
    
    setWorkPermits({
      hotWork: job.workPermit.includes("Hot Work"),
      workAtHigh: job.workPermit.includes("Work at High"),
      confinedSpace: job.workPermit.includes("Confined Space"),
      digging: job.workPermit.includes("Digging"),
      electrical: job.workPermit.includes("Electrical"),
    });
    setIsModalOpen(true);
  };

  // Handle Tutup Modal Utama
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJobId(null);
    setJobTitle("");
    setDescription("");
    setDepartment("");
    setWorkPermits({
      hotWork: false,
      workAtHigh: false,
      confinedSpace: false,
      digging: false,
      electrical: false,
    });
  };

  // Handle Simpan Data (Tambah Baru ATAU Update Data Terpilih)
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPermits = Object.entries(workPermits)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        const labels: Record<string, string> = {
          hotWork: "Hot Work",
          workAtHigh: "Work at High",
          confinedSpace: "Confined Space",
          digging: "Digging",
          electrical: "Electrical"
        };
        return labels[key];
      });

    if (editingJobId) {
      // MODE EDIT: Update object terpilih berdasarkan id
      setJobs(jobs.map(job => job.id === editingJobId ? {
        ...job,
        title: jobTitle,
        description: description.split('\n').filter(line => line.trim() !== ""),
        workPermit: selectedPermits,
        department: department
      } : job));
    } else {
      // MODE TAMBAH BARU
      const newJob: ProjectJobItem = {
        id: Date.now().toString(),
        title: jobTitle || "Untitled Job",
        timeRequest: new Date().toISOString().replace('T', ' ').substring(0, 19),
        description: description.split('\n').filter(line => line.trim() !== ""),
        workPermit: selectedPermits,
        spareparts: "no data",
        tools: "no data",
        department: department
      };
      setJobs([newJob, ...jobs]);
    }
    handleCloseModal();
  };

  // Handle Hapus Objek Terpilih (Tombol Merah)
  const handleDeleteJob = (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus data job ini?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // Handle Buka Pop-Up Settings (Tombol Amber - Tengah)
  const handleOpenSettingModal = (job: ProjectJobItem) => {
    setSelectedJob(job);
    setIsSettingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Header Title */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
        <FileText className="w-6 h-6 text-emerald-500" />
        <h1 className="text-xl font-semibold tracking-wide">Project Job</h1>
      </div>

      {/* Control Actions Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-t-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 pl-10 text-sm focus:outline-none focus:border-emerald-500 text-slate-200 placeholder-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {/* Info Counter Data */}
      <div className="bg-slate-900 border-x border-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-800">
        Found {jobs.length} data(s)
      </div>

      {/* Table Main Layout */}
      <div className="bg-slate-900 border border-t-0 border-slate-800 rounded-b-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase bg-slate-900/50">
              <th className="p-4 w-1/2">Job Details</th>
              <th className="p-4 w-1/4">Info</th>
              <th className="p-4 w-1/4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                {/* Column 1: Job Details */}
                <td className="p-4 align-top">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">
                        Approval Progress
                      </span>
                      <span className="font-semibold text-slate-200 text-base">{job.title}</span>
                      <span className="text-slate-500 font-light">/ mins</span>
                    </div>
                    
                    <div className="text-xs text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-300">Time Request:</span> {job.timeRequest}
                    </div>
                    
                    <div className="text-slate-300 font-medium text-sm mt-1">{job.title}</div>
                    
                    {job.workPermit.length > 0 && (
                      <div className="text-xs text-slate-400">
                        <span className="font-medium text-slate-300">Request Permit:</span> {job.workPermit.join(', ')},
                      </div>
                    )}

                    {job.description.length > 0 && (
                      <ol className="list-decimal list-inside text-xs text-slate-400 space-y-0.5 mt-1 pl-1 bg-slate-950/40 p-2 rounded border border-slate-800/40">
                        {job.description.map((line, idx) => (
                          <li key={idx} className="text-slate-400">{line}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </td>

                {/* Column 2: Info */}
                <td className="p-4 align-top">
                  <div className="flex flex-col items-start gap-3">
                    <button className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded transition-colors shadow-sm">
                      Ask Approval
                    </button>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div><span className="font-medium text-slate-300">Work Permit :</span></div>
                      <div>
                        <span className="font-medium text-slate-300">Sparepart(s):</span>{" "}
                        <span className={job.spareparts === 'no data' ? 'text-slate-500 italic' : 'text-slate-300'}>{job.spareparts}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-300">Tool(s):</span>{" "}
                        <span className={job.tools === 'no data' ? 'text-slate-500 italic' : 'text-slate-300'}>{job.tools}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Column 3: Actions Buttons */}
                <td className="p-4 align-top text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* EDIT BUTTON (Kiri - Blue) */}
                    <button 
                      onClick={() => handleOpenEditModal(job)}
                      className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded transition-colors" 
                      title="Edit Selected Object"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {/* SETTING BUTTON (Tengah - Amber) */}
                    <button 
                      onClick={() => handleOpenSettingModal(job)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-1.5 rounded transition-colors" 
                      title="Setting Project Job"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    {/* DELETE BUTTON (Kanan - Rose) */}
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="bg-rose-600 hover:bg-rose-500 text-white p-1.5 rounded transition-colors" 
                      title="Delete Selected Object"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL POP UP 1: ADD / EDIT PROJECT JOB */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-base font-semibold text-slate-200">
                  {editingJobId ? "Edit Project Job" : "Add Project Job"}
                </h2>
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">FO-MTN-01-005</span>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob}>
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-sm text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                  <label className="text-xs font-medium text-slate-400 pt-2 md:col-span-1">Job Title:</label>
                  <div className="md:col-span-3">
                    <textarea
                      rows={2}
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-200 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                  <label className="text-xs font-medium text-slate-400 pt-1 md:col-span-1">Work Permit:</label>
                  <div className="md:col-span-3 space-y-2 text-xs bg-slate-950/40 p-3 rounded border border-slate-800">
                    {[
                      { id: "hotWork", label: "1. Hot Work" },
                      { id: "workAtHigh", label: "2. Work at High" },
                      { id: "confinedSpace", label: "3. Confined Space" },
                      { id: "digging", label: "4. Digging" },
                      { id: "electrical", label: "5. Electrical" },
                    ].map((permit) => (
                      <div key={permit.id} className="flex items-center justify-between border-b border-slate-800/50 pb-1.5 last:border-0 last:pb-0">
                        <span className="text-slate-300">{permit.label}</span>
                        <div className="flex items-center gap-4">
                          <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={permit.id}
                              checked={workPermits[permit.id as keyof typeof workPermits] === true}
                              onChange={() => setWorkPermits({ ...workPermits, [permit.id]: true })}
                              className="accent-emerald-500 w-3.5 h-3.5 bg-slate-950 border-slate-800"
                            />
                            <span className="text-[11px] text-slate-400">YES</span>
                          </label>
                          <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={permit.id}
                              checked={workPermits[permit.id as keyof typeof workPermits] === false}
                              onChange={() => setWorkPermits({ ...workPermits, [permit.id]: false })}
                              className="accent-rose-500 w-3.5 h-3.5 bg-slate-950 border-slate-800"
                            />
                            <span className="text-[11px] text-slate-400">NO</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                  <label className="text-xs font-medium text-slate-400 pt-2 md:col-span-1">Description:</label>
                  <div className="md:col-span-3">
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Gunakan baris baru (Enter) untuk memisahkan list deskripsi kerja"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-200 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                  <div className="text-xs font-medium text-slate-400 pt-1 md:col-span-1">
                    <div>Added by,</div>
                    <div className="text-[11px] text-slate-500 font-mono">90006(Atikom Imsap)</div>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-950/20 p-2 rounded border border-slate-800">
                    {["Electrical", "Mechanical", "Production", "Safety", "Quality"].map((dept) => (
                      <label key={dept} className="flex items-center gap-1.5 cursor-pointer p-1.5 hover:bg-slate-800 rounded transition-colors">
                        <input
                          type="radio"
                          name="department"
                          value={dept}
                          checked={department === dept}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="accent-emerald-500 w-3.5 h-3.5"
                        />
                        <span className="text-slate-300">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 flex justify-end gap-2">
                <button type="button" onClick={handleCloseModal} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded text-xs font-medium border border-slate-700">
                  Close
                </button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-xs font-medium shadow-sm">
                  {editingJobId ? "UPDATE" : "ADD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL POP UP 2: SETTING PROJECT JOB (Berdasarkan Screenshot Terbaru) */}
      {isSettingModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-6xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSettingModalOpen(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-3 py-1 rounded flex items-center gap-1 text-xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" /> BACK
                </button>
                <span className="text-sm font-medium text-slate-300 flex items-center gap-1">
                  <Settings className="w-4 h-4 text-slate-400" /> Setting Project Job
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">FO-MTN-01-005</span>
            </div>

            {/* Layout Grid Dashboard Popup */}
            <div className="p-5 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950/20 text-slate-200">
              
              {/* Kolom Kiri & Tengah (Span 2) */}
              <div className="lg:col-span-2 space-y-4">
                {/* Panel 1: Job Detail */}
                <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Job Detail</h3>
                  <div className="space-y-1 text-sm">
                    <div className="font-bold text-slate-100 text-base">{selectedJob.title}</div>
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Request Permit:</span> {selectedJob.workPermit.join(", ") || "None"}
                    </div>
                    {selectedJob.description.map((line, idx) => (
                      <div key={idx} className="text-xs text-slate-400 font-light pl-2 border-l border-slate-700 mt-1">
                        {idx + 1}. {line}
                      </div>
                    ))}
                    <div className="text-xs text-slate-300 font-semibold mt-4">Remark:</div>
                  </div>
                </div>

                {/* Grid Sub: Sparepart & Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Panel 2: Spare Part */}
                  <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Spare Part</h3>
                    <div className="space-y-2">
                      <input type="text" placeholder="Spare Part" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                      <div className="flex gap-2">
                        <input type="text" placeholder="Quantity" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded text-xs shrink-0">Add Part</button>
                      </div>
                      <table className="w-full text-left text-xs border-collapse mt-4">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold">
                            <th className="pb-1">No</th>
                            <th className="pb-1">Name</th>
                            <th className="pb-1">Q</th>
                            <th className="pb-1 text-center">Del</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-slate-500 italic"><td colSpan={4} className="py-4 text-center">No data</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Panel 3: Tools */}
                  <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Tools</h3>
                    <div className="space-y-2">
                      <select className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none">
                        <option>Select Tool</option>
                      </select>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Quantity" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                        <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded text-xs shrink-0">Add Tool</button>
                      </div>
                      <table className="w-full text-left text-xs border-collapse mt-4">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold">
                            <th className="pb-1">No</th>
                            <th className="pb-1">Name</th>
                            <th className="pb-1">Q</th>
                            <th className="pb-1 text-center">Del</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-slate-500 italic"><td colSpan={4} className="py-4 text-center">No data</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan (Span 1) */}
              <div className="space-y-4">
                {/* Panel 4: Time Setting */}
                <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Time Setting</h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div>Project type, no repeater</div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span>Project type, submit execution date at</span>
                      <button type="button" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-2 py-1 rounded text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Plan Calendar
                      </button>
                    </div>
                    <div className="pt-2 font-semibold">Duration: <span className="text-slate-400 font-normal">no setting</span></div>
                    <div className="flex rounded overflow-hidden border border-slate-800">
                      <input type="text" placeholder="Duration (in mins)" className="w-full bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none" />
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 px-3 flex items-center justify-center"><Settings className="w-3.5 h-3.5 text-white" /></button>
                    </div>
                  </div>
                </div>

                {/* Panel 5: Ready to use Device */}
                <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Ready to use Device</h3>
                  <div className="space-y-2">
                    <div className="flex gap-1.5">
                      <select className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none">
                        <option>Select Device</option>
                      </select>
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-2.5 py-1.5 rounded text-xs shrink-0">Add Device</button>
                    </div>
                    <table className="w-full text-left text-xs border-collapse mt-2">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-bold">
                          <th className="pb-1">No</th>
                          <th className="pb-1">Name</th>
                          <th className="pb-1 text-right">Del</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-slate-500 italic"><td colSpan={3} className="py-3 text-center">No data</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Panel 6: Document Permit */}
                <div className="bg-slate-900 border-t-2 border-t-blue-500 border border-slate-800 rounded p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide border-b border-slate-800/60 pb-1.5 mb-3">Document Permit</h3>
                  <div className="flex gap-1.5">
                    <select className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-400 focus:outline-none">
                      <option>Select Permit</option>
                    </select>
                    <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-2.5 py-1.5 rounded text-xs shrink-0">Add Document</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Setting Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
              <button 
                onClick={() => setIsSettingModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-4 py-1.5 rounded text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}