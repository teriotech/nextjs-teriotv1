"use client";

import React, { useState } from "react";

const summaryCards = [
  { title: "Machine Press", value: "", color: "bg-sky-600", icon: "📦" },
  { title: "Machine Injection", value: "77%", color: "bg-emerald-600", icon: "⚡", large: true },
  { title: "Machine Molding", value: "", color: "bg-cyan-600", icon: "🔌" },
  { title: "Utilities", value: "", color: "bg-orange-500", icon: "🛠️" },
  { title: "Boiler", value: "", color: "bg-rose-600", icon: "🔥" },
];

const ringItems = [
  { label: "New", value: 0, color: "border-emerald-500 text-emerald-500" },
  { label: "Mid", value: 117, color: "border-sky-500 text-sky-500" },
  { label: "Old", value: 79, color: "border-indigo-500 text-indigo-500" },
  { label: "Warning", value: 73, color: "border-amber-500 text-amber-500" },
  { label: "Danger", value: 883, color: "border-rose-500 text-rose-500" },
];

const tableRows = [
  {
    no: 1,
    category: "E",
    machine: "Panel Mortar",
    device: "MCB Schneider 6A",
    position: "Cell 02",
    tag: "q",
    price: "100,000",
    install: "2025-08-19",
    lifetime: "1750",
    todayRun: "325",
    nextReplace: "2030-06-04",
    status: "new",
    percentage: "20%",
    rootcause: "di bersihkan kondisi masih bagus",
    lastUser: "-",
  },
  {
    no: 2,
    category: "E",
    machine: "Panel BC Pump House",
    device: "Wago DI 750-430",
    position: "Cell",
    tag: "DI170",
    price: "1,800,000",
    install: "2018-12-12",
    lifetime: "2180",
    todayRun: "2767",
    nextReplace: "2024-11-30",
    status: "danger",
    percentage: "130%",
    rootcause: "-",
    lastUser: "-",
  },
  {
    no: 3,
    category: "E",
    machine: "MCC Panel Rawmat",
    device: "CT T",
    position: "Cell 04",
    tag: "RMA-PRMA-CT-03",
    price: "550,000",
    install: "2018-12-31",
    lifetime: "3225",
    todayRun: "2748",
    nextReplace: "2027-10-30",
    status: "warning",
    percentage: "90%",
    rootcause: "-",
    lastUser: "-",
  },
  {
    no: 4,
    category: "E",
    machine: "CRUSHER",
    device: "Main Motor Crusher",
    position: "55 kW",
    tag: "RMA-CR-M-01",
    price: "10,000,000",
    install: "2020-12-10",
    lifetime: "2180",
    todayRun: "2038",
    nextReplace: "2026-11-29",
    status: "warning",
    percentage: "90%",
    rootcause: "-",
    lastUser: "90689 (Damita Adhi Pratama)",
  },
];

const statusStyles: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  danger: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
};

export default function TimeBasedMaintenancePage() {
  const [editRow, setEditRow] = useState<number | null>(null);
  const [uploadRow, setUploadRow] = useState<number | null>(null);
  const [deleteRow, setDeleteRow] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white text-[0.8rem] leading-6 px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1640px] space-y-6">
        <header className="rounded-3xl border border-white/10 bg-[#09090b]/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Time Base Maintenance</p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Overview TBM 90001 <span className="text-sm font-medium text-zinc-400">(admin)</span></h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span>Maintenance</span>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Time Base Maintenance</span>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Overview</span>
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1fr_1.8fr_1fr]">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.32)] ${card.large ? "xl:col-span-1 xl:row-span-2" : ""} bg-[#09090b]/90`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{card.title}</p>
                  {card.value ? (
                    <p className="mt-4 text-4xl font-black text-white">{card.value}</p>
                  ) : (
                    <p className="mt-4 text-sm text-zinc-300">Status dashboard panel</p>
                  )}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
              </div>
              <div className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white/90 ${card.color.replace("bg-", "bg-")}/90`}>See details</div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#09090b]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Grafik Sparepart Area Mixing & Mould Casting</p>
            </div>
            <div className="text-sm text-zinc-300">Updated just now</div>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {ringItems.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-[#050505]/80 p-5 text-center">
                <div className={`mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-8 ${item.color} bg-white/5`}>
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                </div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#050505]/90 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">Estimation sparepart cost</p>
            <p className="mt-4 text-3xl font-extrabold text-white">IDR Rp 195.140.000</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              <button className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">WKB Machine</button>
              <button className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Mixing & Moulding Casting</button>
              <button className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">Boiler & Autoclave</button>
              <button className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Raw Material</button>
              <button className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400">Utilities</button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#09090b]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-3xl border border-white/10 bg-[#050505]/80 p-4">
              <label className="flex-1">
                <span className="text-sm font-semibold text-zinc-300">Category</span>
                <select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30">
                  <option value="">All Categories</option>
                  <option value="E">E</option>
                  <option value="M">M</option>
                </select>
              </label>
              <button className="whitespace-nowrap rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400">Search</button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">Export Data TBM</button>
              <button className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">Add Sparepart</button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#050505]/90">
            <table className="min-w-full border-collapse text-left text-sm text-zinc-200">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  <th className="px-4 py-4">No.</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Machine</th>
                  <th className="px-4 py-4">Device</th>
                  <th className="px-4 py-4">Position</th>
                  <th className="px-4 py-4">Tag</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Last Install</th>
                  <th className="px-4 py-4">Life Time (day)</th>
                  <th className="px-4 py-4">Today Run (day)</th>
                  <th className="px-4 py-4">Next Replacement</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Percentage</th>
                  <th className="px-4 py-4">Rootcause</th>
                  <th className="px-4 py-4">Last User</th>
                  <th className="px-4 py-4">Action</th>
                  <th className="px-4 py-4">Detail</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.no} className="border-t border-white/10 last:border-b last:border-white/10 hover:bg-white/5">
                    <td className="px-4 py-4 font-semibold text-white">{row.no}</td>
                    <td className="px-4 py-4 font-medium text-cyan-300">{row.category}</td>
                    <td className="px-4 py-4">{row.machine}</td>
                    <td className="px-4 py-4">{row.device}</td>
                    <td className="px-4 py-4">{row.position}</td>
                    <td className="px-4 py-4">{row.tag}</td>
                    <td className="px-4 py-4">{row.price}</td>
                    <td className="px-4 py-4">{row.install}</td>
                    <td className="px-4 py-4">{row.lifetime}</td>
                    <td className="px-4 py-4">{row.todayRun}</td>
                    <td className="px-4 py-4">{row.nextReplace}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status] || "bg-zinc-700/60 text-zinc-200"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{row.percentage}</span>
                        <div className="h-2.5 w-24 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full ${row.status === "danger" ? "bg-rose-500" : row.status === "warning" ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: row.percentage }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{row.rootcause}</td>
                    <td className="px-4 py-4">{row.lastUser}</td>
                    <td className="px-4 py-4 space-y-2">
                      <button
                        onClick={() => setEditRow(row.no)}
                        className="w-full rounded-2xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700"
                      >
                        Edit
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setUploadRow(uploadRow === row.no ? null : row.no)}
                          className="w-full rounded-2xl bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-500"
                        >
                          Upload
                        </button>
                        {uploadRow === row.no && (
                          <div className="absolute left-0 top-full z-20 mt-2 w-44 rounded-2xl border border-white/10 bg-[#09090b]/95 p-3 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                            <button className="w-full rounded-xl px-3 py-2 text-xs text-zinc-100 transition hover:bg-white/5">Datasheet</button>
                            <button className="mt-2 w-full rounded-xl px-3 py-2 text-xs text-zinc-100 transition hover:bg-white/5">Picture</button>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setDeleteRow(row.no)}
                        className="w-full rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-400"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-4 py-4 text-cyan-300 underline decoration-cyan-300/30 decoration-2">Details</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editRow !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#09090b]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-white">Edit Row {editRow}</h2>
                    <p className="mt-2 text-sm text-zinc-400">Update the selected maintenance entry details.</p>
                  </div>
                  <button onClick={() => setEditRow(null)} className="text-zinc-300 transition hover:text-white">✕</button>
                </div>
                <div className="mt-6 space-y-4 text-sm text-zinc-300">
                  <p>Form fields can be added here for edit values.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-500">Save changes</button>
                    <button onClick={() => setEditRow(null)} className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {deleteRow !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#09090b]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <h2 className="text-xl font-extrabold tracking-tight text-white">Confirm Delete</h2>
                <p className="mt-3 text-sm text-zinc-400">Delete row {deleteRow}? This action cannot be undone in the demo view.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button onClick={() => setDeleteRow(null)} className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5">Cancel</button>
                  <button onClick={() => setDeleteRow(null)} className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-400">Delete</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
