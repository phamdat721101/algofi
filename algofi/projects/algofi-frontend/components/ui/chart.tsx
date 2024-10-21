"use client"

import * as React from "react"
import { ResponsiveContainer, TooltipProps } from "recharts"

import { cn } from "../../lib/utils"

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => {
    const [colors, setColors] = React.useState<Record<string, string>>({})

    React.useEffect(() => {
      const newColors: Record<string, string> = {}
      Object.entries(config).forEach(([key, value]) => {
        newColors[`--color-${key}`] = value.color
      })
      setColors(newColors)
    }, [config])

    return (
      <div
        ref={ref}
        className={cn("h-[350px] w-full", className)}
        style={colors}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

export interface ChartTooltipProps extends TooltipProps<any, any> {
  hideLabel?: boolean
  indicator?: "line" | "dot"
}

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ className, active, payload, label, hideLabel = false, indicator = "dot", ...props }, ref) => {
    if (!active || !payload) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-sm",
          className
        )}
        {...props}
      >
        {!hideLabel && <div className="mb-2 font-medium">{label}</div>}
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center">
            {indicator === "dot" ? (
              <div
                className="mr-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            ) : (
              <div
                className="mr-2 h-3 w-0.5"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="font-medium">{item.name}:</span>
            <span className="ml-1">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ className, active, payload, label, hideLabel = false, indicator = "dot", ...props }, ref) => {
    if (!active || !payload) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-sm",
          className
        )}
        {...props}
      >
        {!hideLabel && <div className="mb-2 font-medium">{label}</div>}
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center">
            {indicator === "dot" ? (
              <div
                className="mr-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            ) : (
              <div
                className="mr-2 h-3 w-0.5"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="font-medium">{item.name}:</span>
            <span className="ml-1">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ResponsiveContainer }