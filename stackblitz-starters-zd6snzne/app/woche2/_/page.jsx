'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Woche2() {
  // Aufgabenstruktur
  const [tasks, setTasks] = useState([
    { day: 'Montag', items: [] },
    { day: 'Dienstag', items: [] },
    { day: 'Mittwoch', items: [] },
    { day: 'Donnerstag', items: [] },
    { day: 'Freitag', items: [] },
    { day: 'Samstag', items: [] },
    { day: 'Sonntag', items: [] },
  ]);

  // Gesamtziel (wird oben angezeigt)
  const [gesamtziel, setGesamtziel] = useState('Technisch sicher spielen');

  // Neues Wochenziel-Feld
  const [wochenziel, setWochenziel] = useState(
    'Diese Woche an Atemtechnik arbeiten'
  );

  // Fortschritt dynamisch berechnen
  const totalTasks = tasks.reduce((sum, t) => sum + t.items.length, 0);
  const erledigt = tasks.reduce(
    (sum, t) => sum + t.items.filter((i) => i.status === 'erledigt').length,
    0
  );
  const maxPunkte = totalTasks * 10;
  const punkte = erledigt * 10;

  // Funktionen
  const addTask = (day) => {
    const task = prompt(`Neuer Task für ${day}:`);
    if (!task) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.day === day
          ? { ...t, items: [...t.items, { title: task, status: 'offen' }] }
          : t
      )
    );
  };

  const updateStatus = (day, index, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.day === day
          ? {
              ...t,
              items: t.items.map((item, i) =>
                i === index ? { ...item, status } : item
              ),
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-pink-500 hover:underline">
            ← Zurück zur Übersicht
          </Link>
          <h1 className="text-2xl font-bold text-pink-600">Woche 1</h1>
        </div>

        {/* Gesamtziel */}
        <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-pink-700 mb-1">
            Gesamtziel 🎯
          </h2>
          <input
            className="border p-2 rounded w-full text-center"
            value={gesamtziel}
            onChange={(e) => setGesamtziel(e.target.value)}
          />
        </div>

        {/* Wochenziel */}
        <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-pink-700 mb-1">
            Wochenziel 🗓️
          </h2>
          <input
            className="border p-2 rounded w-full text-center"
            value={wochenziel}
            onChange={(e) => setWochenziel(e.target.value)}
          />
        </div>

        {/* Fortschritt */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">Fortschritt</h2>
          <p>
            {punkte} / {maxPunkte || 0} Punkte
          </p>
          <div className="w-full bg-pink-200 h-3 rounded-full mt-2">
            <div
              className="bg-pink-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: maxPunkte > 0 ? `${(punkte / maxPunkte) * 100}%` : '0%',
              }}
            ></div>
          </div>
        </div>

        {/* Aufgabenübersicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((day) => (
            <div
              key={day.day}
              className="border border-pink-300 p-4 rounded-2xl bg-pink-50 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-pink-700">{day.day}</h3>
                <button
                  onClick={() => addTask(day.day)}
                  className="bg-pink-400 text-white px-2 py-1 rounded hover:bg-pink-500"
                >
                  +
                </button>
              </div>
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white border p-2 rounded mb-2"
                >
                  <span
                    className={
                      item.status === 'erledigt'
                        ? 'line-through text-gray-400'
                        : ''
                    }
                  >
                    {item.title}
                  </span>
                  <select
                    className="border rounded p-1 text-sm"
                    value={item.status}
                    onChange={(e) => updateStatus(day.day, i, e.target.value)}
                  >
                    <option value="offen">Offen</option>
                    <option value="in Bearbeitung">In Bearbeitung</option>
                    <option value="erledigt">Erledigt</option>
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
