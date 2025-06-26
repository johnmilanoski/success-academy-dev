"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ earnings: 0, live: 0, pending: 0 });
  useEffect(() => {
    fetch("/api/instructor/earnings")
      .then((r) => r.json())
      .then((d) => setStats({ earnings: d.total, live: 3, pending: 1 }));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card title="Total Earnings">${stats.earnings}</Card>
        <Card title="Courses Live">{stats.live}</Card>
        <Card title="Pending Payout">{stats.pending}</Card>
      </section>

      <section className="rounded-xl border bg-white p-4 shadow">
        <h2 className="mb-2 text-sm font-semibold text-slate-600">
          Earnings – Last 30 Days
        </h2>
        <div className="h-52 grid place-content-center text-slate-400">
          {/* Replace with real chart later */}
          [ chart placeholder ]
        </div>
      </section>
    </div>
  );
}
