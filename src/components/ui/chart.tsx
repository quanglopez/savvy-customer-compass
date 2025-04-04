
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

// AreaChart component
const AreaChart: React.FC<{
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  showGradient?: boolean;
  className?: string;
}> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  showGradient = true,
  className,
  ...props
}) => {
  const config = React.useMemo<ChartConfig>(() => {
    const _config: ChartConfig = {}

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      _config[category] = {
        label: category,
        color: colors?.[i],
      }
    }

    return _config
  }, [categories, colors])

  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <RechartsPrimitive.ComposedChart data={data}>
        {showGridLines && (
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        )}
        {showXAxis && (
          <RechartsPrimitive.XAxis
            dataKey={index}
            className="text-sm"
          />
        )}
        {showYAxis && (
          <RechartsPrimitive.YAxis
            className="text-sm"
            width={40}
            tickFormatter={(value) =>
              valueFormatter && typeof value === 'number' ? valueFormatter(value) : value
            }
          />
        )}
        {showTooltip && (
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null

              return (
                <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                  <div className="grid gap-2">
                    <p className="font-medium">{label}</p>
                    <ul className="grid gap-1">
                      {payload.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {entry.name}:{" "}
                            {valueFormatter && typeof entry.value === 'number'
                              ? valueFormatter(entry.value)
                              : entry.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }}
          />
        )}
        {showLegend && (
          <RechartsPrimitive.Legend
            content={({ payload }) => {
              if (!payload?.length) return null

              return (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div
                      key={`item-${index}`}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
        )}
        {categories.map((category, i) => (
          <RechartsPrimitive.Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors?.[i]}
            stroke={colors?.[i]}
            fillOpacity={showGradient ? 0.2 : 1}
            stackId={1}
          />
        ))}
      </RechartsPrimitive.ComposedChart>
    </ChartContainer>
  )
}

// BarChart component
const BarChart: React.FC<{
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  stack?: boolean;
  className?: string;
}> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  stack = false,
  className,
  ...props
}) => {
  const config = React.useMemo<ChartConfig>(() => {
    const _config: ChartConfig = {}

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      _config[category] = {
        label: category,
        color: colors?.[i],
      }
    }

    return _config
  }, [categories, colors])

  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <RechartsPrimitive.BarChart data={data}>
        {showGridLines && (
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        )}
        {showXAxis && (
          <RechartsPrimitive.XAxis
            dataKey={index}
            className="text-sm"
          />
        )}
        {showYAxis && (
          <RechartsPrimitive.YAxis
            className="text-sm"
            width={40}
            tickFormatter={(value) =>
              valueFormatter && typeof value === 'number' ? valueFormatter(value) : value
            }
          />
        )}
        {showTooltip && (
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null

              return (
                <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                  <div className="grid gap-2">
                    <p className="font-medium">{label}</p>
                    <ul className="grid gap-1">
                      {payload.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {entry.name}:{" "}
                            {valueFormatter && typeof entry.value === 'number'
                              ? valueFormatter(entry.value)
                              : entry.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }}
          />
        )}
        {showLegend && (
          <RechartsPrimitive.Legend
            content={({ payload }) => {
              if (!payload?.length) return null

              return (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div
                      key={`item-${index}`}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
        )}
        {categories.map((category, i) => (
          <RechartsPrimitive.Bar
            key={category}
            dataKey={category}
            fill={colors?.[i]}
            stackId={stack ? "stack" : undefined}
          />
        ))}
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  )
}

// PieChart component
const PieChart: React.FC<{
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showTooltip?: boolean;
  showLegend?: boolean;
  className?: string;
}> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showTooltip = true,
  showLegend = true,
  className,
  ...props
}) => {
  const config = React.useMemo<ChartConfig>(() => {
    const _config: ChartConfig = {}

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      _config[item[index]] = {
        label: item[index],
        color: colors?.[i],
      }
    }

    return _config
  }, [data, index, colors])

  return (
    <ChartContainer className={cn("w-full", className)} config={config} {...props}>
      <RechartsPrimitive.PieChart>
        {showTooltip && (
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const { name, value } = payload[0]

              return (
                <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: payload[0].color }}
                      />
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {valueFormatter && typeof value === 'number' ? valueFormatter(value) : value}
                    </div>
                  </div>
                </div>
              )
            }}
          />
        )}
        {showLegend && (
          <RechartsPrimitive.Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            content={({ payload }) => {
              if (!payload?.length) return null

              return (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {payload.map((entry, index) => (
                    <div
                      key={`item-${index}`}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
        )}
        <RechartsPrimitive.Pie
          data={data}
          dataKey={categories[0]}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#0066CC"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <RechartsPrimitive.Cell
              key={`cell-${index}`}
              fill={colors?.[index % (colors?.length || 1)]}
            />
          ))}
        </RechartsPrimitive.Pie>
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  AreaChart,
  BarChart,
  PieChart
}
