import React from 'react';
import { Gauge, Zap, Compass, Activity } from 'lucide-react';

export default function TelemetryHUD({ speed = 0, progress = 0, gear = '1' }) {
  const displaySpeed = Math.round(speed);
  const displayProgress = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const rpmPercent = Math.min(100, Math.max(15, (speed / 212) * 100));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl pointer-events-none transition-all duration-300">
      <div className="glass-panel-glow rounded-2xl p-3 md:p-4 border border-emerald-500/20 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4">
        
        {/* Speedometer readout */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1">
              <Gauge className="w-3 h-3 text-emerald-400" />
              Velocity
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-2xl md:text-3xl tracking-tight text-white tabular-nums drop-shadow-md">
                {displaySpeed.toString().padStart(3, '0')}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">MPH</span>
            </div>
          </div>
        </div>

        {/* RPM / Throttle Bar */}
        <div className="hidden sm:flex flex-col flex-1 px-3 border-x border-white/10">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              Twin-Turbo V8 RPM
            </span>
            <span className="text-emerald-400 font-semibold tabular-nums">
              {Math.round(1200 + (rpmPercent / 100) * 7300)} RPM
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-amber-400 transition-all duration-75"
              style={{ width: `${rpmPercent}%` }}
            />
          </div>
        </div>

        {/* Gear and Track Distance */}
        <div className="flex items-center gap-4">
          {/* Gear Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase text-gray-400">Gear</span>
            <span className="font-display font-black text-lg md:text-xl text-[#def54f] px-2 py-0.5 rounded-lg bg-[#def54f]/10 border border-[#def54f]/30 leading-none mt-0.5">
              {gear}
            </span>
          </div>

          {/* Scroll Distance % */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase text-gray-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#def54f]" />
              Track Progress
            </span>
            <div className="font-display font-bold text-lg md:text-xl text-white tabular-nums">
              {displayProgress}%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
