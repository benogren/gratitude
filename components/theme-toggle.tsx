"use client"

import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sun, Moon, Monitor } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="light" id="light" className="mt-1" />
          <div className="flex-1 cursor-pointer" onClick={() => setTheme("light")}>
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4" />
              <Label htmlFor="light" className="cursor-pointer font-medium">
                Light
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Use light mode regardless of system settings
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RadioGroupItem value="dark" id="dark" className="mt-1" />
          <div className="flex-1 cursor-pointer" onClick={() => setTheme("dark")}>
            <div className="flex items-center gap-2 mb-1">
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark" className="cursor-pointer font-medium">
                Dark
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Use dark mode regardless of system settings
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RadioGroupItem value="system" id="system" className="mt-1" />
          <div className="flex-1 cursor-pointer" onClick={() => setTheme("system")}>
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="h-4 w-4" />
              <Label htmlFor="system" className="cursor-pointer font-medium">
                System
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically match your system's theme preference
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
