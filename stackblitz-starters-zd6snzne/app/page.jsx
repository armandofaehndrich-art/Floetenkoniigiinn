'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [wochenData, setWochenData] = useState([]);
  const [gesamtziel, setGesamtziel] = useState('🎵 Pascale die Flötenkönigin 💖');

  // Funktion zum Laden der Punkte aus dem LocalStorage
  const ladePunkte = () => {
    const data = [];
    for (let i = 1; i <= 6; i++) {
      const saved = localStorage.getItem(`woche${i}_punkte`);
      if (saved) {
        const parsed = JSON.parse(saved);
        data.push({
          woche: i,
          punkte: parsed.punkte || 0,
          maxPunkte: parsed.maxPunkte || 0,
        });
      } else {
        data.push({ woche: i, punkte: 0, maxPunkte: 0 });
      }
    }
    setWochenData(data);
  };

  // 1️⃣ Beim Laden einmal aufrufen
  useEffect(() => {
    ladePunkte();
  }, []);

  // 2️⃣ Aktualisieren, wenn man zur Seite zurückkehrt
  useEffect(() => {
    const handler = () => ladePunkte();
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  // 3️⃣ Gesamtpunkte berechnen
  const gesamtErreicht = wochenData.reduce((sum, w) => sum + w.punkte, 0);
  const gesamtMax = wochenData.reduce((sum, w) => sum + w.maxPunkte, 0);

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Titel */}
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          {gesamtziel}
        </h1>

        {/* Gesamtübersicht */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">
            Gesamtübersicht 🎯
          </h2>
          <p>
            {gesamtErreicht} / {gesamtMax || 0} Punkte erreicht
          </p>
          <div className="w-full bg-pink-200 h-3 rounded-full mt-2">
            <div
              className="bg-pink-500 h-3 rounded-full transition-all duration-300"
              style={{
                width:
                  gesamtMax > 0
                    ? `${(gesamtErreicht / gesamtMax) * 100}%`
                    : '0%',
              }}
            ></div>
          </div>
        </div>

        {/* Wochenübersicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wochenData.map((woche) => (
            <div
              key={woche.woche}
              className="border border-pink-300 p-4 rounded-2xl bg-pink-50 shadow-sm"
            >
              <h3 className="text-lg font-bold text-pink-600 mb-2">
                Woche {woche.woche}
              </h3>
              <p className="mb-2">
                {woche.punkte} / {woche.maxPunkte || 0} Punkte
              </p>
              <div className="w-full bg-pink-200 h-2 rounded-full mb-3">
                <div
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width:
                      woche.maxPunkte > 0
                        ? `${(woche.punkte / woche.maxPunkte) * 100}%`
                        : '0%',
                  }}
                ></div>
              </div>

              {/* Link zur Woche */}
              <Link
                href={`/woche${woche.woche}`}
                className="text-pink-500 hover:underline font-medium"
              >
                → Zur Woche {woche.woche}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
