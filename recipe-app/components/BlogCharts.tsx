'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface BlogChartProps {
  type: 'bar' | 'pie' | 'horizontal-bar' | 'line';
  data: ChartData[];
  title: string;
  subtitle?: string;
  valueLabel?: string;
  showPercentage?: boolean;
}

const COLORS = ['#E3ECF3', '#4F7A3A', '#F4B740', '#E5533C', '#4F7A3A', '#ec4899', '#06b6d4', '#84cc16'];

function ChartContent({ type, data, valueLabel = '', showPercentage }: Omit<BlogChartProps, 'title' | 'subtitle'>) {
  const {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
  } = require('recharts');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-ink">{label || payload[0].name}</p>
          <p className="text-blue-600 font-semibold">
            {payload[0].value}{showPercentage ? '%' : ''} {valueLabel}
          </p>
        </div>
      );
    }
    return null;
  };

  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#666', fontSize: 11 }}
              interval={0}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#666', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );

    case 'horizontal-bar':
      return (
        <ResponsiveContainer width="100%" height={Math.max(200, data.length * 50)}>
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#666', fontSize: 12 }} domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#666', fontSize: 12 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );

    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }: { name: string; percent?: number }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'line':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
            <YAxis tick={{ fill: '#666', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#E3ECF3', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    default:
      return null;
  }
}

export default function BlogChart({ type, data, title, subtitle, valueLabel = '', showPercentage }: BlogChartProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="my-8 p-5 bg-white rounded-2xl border border-line shadow-sm">
        <div className="mb-4">
          <h4 className="text-base font-bold text-ink">{title}</h4>
          {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
        </div>
        <div className="h-[300px] flex items-center justify-center text-muted">
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 p-5 bg-white rounded-2xl border border-line shadow-sm">
        <div className="mb-4">
          <h4 className="text-base font-bold text-ink">{title}</h4>
          {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
        </div>
        <div className="h-[200px] flex items-center justify-center text-muted">
          Chart unavailable
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 p-5 bg-white rounded-2xl border border-line shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-ink">{title}</h4>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      <ChartContent type={type} data={data} valueLabel={valueLabel} showPercentage={showPercentage} />
    </div>
  );
}
