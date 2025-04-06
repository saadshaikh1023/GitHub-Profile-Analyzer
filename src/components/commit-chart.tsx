import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CommitActivity } from '@/types/github';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface CommitChartProps {
  commitData: CommitActivity[];
}

export function CommitChart({ commitData }: CommitChartProps) {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  // Get unique years from commit data
  const years = Array.from(new Set(
    commitData.map(week => new Date(week.week * 1000).getFullYear())
  )).sort((a, b) => b - a);

  // Filter and process data for the selected year
  const filteredData = commitData
    .filter(week => new Date(week.week * 1000).getFullYear() === parseInt(selectedYear))
    .map(week => ({
      week: new Date(week.week * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      commits: week.total,
    }));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Contribution Activity</CardTitle>
        <Select
          value={selectedYear}
          onValueChange={setSelectedYear}
        >
          <SelectTrigger className="w-[120px] sm:w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] mt-2 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={filteredData} 
              margin={{ 
                top: 10, 
                right: 5, 
                left: 0, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="week"
                className="text-xs sm:text-sm text-muted-foreground"
                tick={{ fill: 'currentColor' }}
                tickFormatter={(value) => {
                  // On small screens, show less ticks
                  if (window.innerWidth < 640) {
                    return '';
                  }
                  return value;
                }}
              />
              <YAxis
                className="text-xs sm:text-sm text-muted-foreground"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.875rem',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar
                dataKey="commits"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}