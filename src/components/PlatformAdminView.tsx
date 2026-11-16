import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Server, Key, CheckCircle, RefreshCw } from 'lucide-react';

export const PlatformAdminView: React.FC = () => {
  const { deployments } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              Platform Headquarters
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Deployment & Licensing Registry</h1>
          <p className="text-slate-400 text-sm mt-1">
            Central administration portal for managed cloud and dedicated customer installations.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <Server className="w-8 h-8 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="text-xs text-slate-400 block">Active Deployments</span>
            <span className="font-bold text-sm text-white">{deployments.length} Customer Environments</span>
          </div>
        </div>
      </div>

      {/* Deployments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Customer Deployment Registry</h3>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg">
            All Systems Operational
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Business Name</th>
                <th className="px-6 py-4">Deployment Model</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Environment</th>
                <th className="px-6 py-4">Branches / Terminals</th>
                <th className="px-6 py-4">Licence Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deployments.map(dep => (
                <tr key={dep.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{dep.businessName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {dep.deploymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{dep.version}</td>
                  <td className="px-6 py-4 text-xs text-slate-600">{dep.environment}</td>
                  <td className="px-6 py-4 text-slate-600">{dep.branchesCount} Branches / {dep.terminalsCount} Terminals</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      dep.licenceStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {dep.licenceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
