'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}

interface ForecastChartProps {
  data: ChartDataPoint[];
  height?: number;
  showArea?: boolean;
  color?: string;
  className?: string;
}

export function ForecastChart({ data, height = 200, showArea = true, color = '#1E4620', className }: ForecastChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('h-[200px] flex items-center justify-center bg-neutral-50 rounded-lg', className)}>
        <p className="text-neutral-500">No forecast data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const padding = (maxValue - minValue) * 0.1 || maxValue * 0.1;

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {showArea ? (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="forecast-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#757575' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#757575' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              domain={[minValue - padding, maxValue + padding]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: '#212121', fontWeight: 600 }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#forecast-gradient)"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: color }}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#757575' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#757575' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              domain={[minValue - padding, maxValue + padding]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: '#212121', fontWeight: 600 }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: color }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  className?: string;
  dataKey?: string;
  nameKey?: string;
}

export function ComparisonBarChart({
  data,
  height = 250,
  color = '#1E4620',
  className,
  dataKey = 'value',
  nameKey = 'name',
}: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('h-[250px] flex items-center justify-center bg-neutral-50 rounded-lg', className)}>
        <p className="text-neutral-500">No comparison data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#757575' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            domain={[0, maxValue * 1.15]}
          />
          <YAxis
            dataKey={nameKey}
            type="category"
            tick={{ fontSize: 12, fill: '#424242', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ color: '#212121', fontWeight: 600 }}
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
          />
          <Bar
            dataKey={dataKey}
            radius={[0, 4, 4, 0]}
            maxBarSize={32}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.change && (entry.change as number) < 0 ? '#E53935' : color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SimpleLineChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  className?: string;
  showDots?: boolean;
}

export function SimpleLineChart({ data, height = 150, color = '#1E4620', className, showDots = false }: SimpleLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('h-[150px] flex items-center justify-center bg-neutral-50 rounded-lg', className)}>
        <p className="text-neutral-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const padding = (maxValue - minValue) * 0.1 || maxValue * 0.1;

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#9E9E9E' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#9E9E9E' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            domain={[minValue - padding, maxValue + padding]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={showDots}
            activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}