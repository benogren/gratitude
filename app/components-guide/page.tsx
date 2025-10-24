"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle2, Info, Bold, Italic, Underline } from "lucide-react";
import { toast } from "sonner";

export default function ComponentsGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Component Guide</h1>
          <p className="text-muted-foreground">
            A showcase of all UI components with the new color palette
          </p>
        </div>

        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Color Palette</h2>

          {/* Primary - Periwinkle */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Primary - Periwinkle</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--primary-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary - Soft Mauve */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Secondary - Soft Mauve</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--secondary-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accent - Mint Green */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Accent - Mint Green</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--accent-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral - Purple Gray */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Neutral - Purple Gray</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--neutral-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Surface Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Surface Colors</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--surface-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Error Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Error Colors</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-16 rounded-md border border-neutral-200 dark:border-neutral-700`}
                    style={{ backgroundColor: `var(--error-${shade})` }}
                  />
                  <p className="text-xs mt-1 text-muted-foreground">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Gradient</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Background Gradient</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Primary Gradient: Secondary-500 to Primary-500
                </p>
                <div
                  className="h-32 rounded-lg border border-neutral-200 dark:border-neutral-700"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Gradient Text</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Apply gradient as text color using background-clip
                </p>
                <div className="space-y-3">
                  <h1
                    className="text-6xl font-bold"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Gradient Heading
                  </h1>
                  <p
                    className="text-2xl font-semibold"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Smaller gradient text example
                  </p>
                  <p
                    className="text-lg"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    You can apply gradients to any text size
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/50 space-y-4">
                <div>
                  <p className="text-sm font-mono mb-2">Background Usage:</p>
                  <code className="text-xs bg-background px-2 py-1 rounded block">
                    background: var(--gradient-primary);
                  </code>
                </div>
                <div>
                  <p className="text-sm font-mono mb-2">Gradient Text Usage (React/Tailwind):</p>
                  <pre className="text-xs bg-background px-3 py-2 rounded overflow-x-auto">
{`style={{
  background: 'var(--gradient-primary)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-mono mb-2">Gradient Text Usage (CSS):</p>
                  <pre className="text-xs bg-background px-3 py-2 rounded overflow-x-auto">
{`.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Buttons</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Default Sizes</h4>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Disabled States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Default</Button>
                  <Button variant="secondary" disabled>Secondary</Button>
                  <Button variant="destructive" disabled>Destructive</Button>
                  <Button variant="outline" disabled>Outline</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Group Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Button Groups</h2>

          <Card>
            <CardHeader>
              <CardTitle>Button Group</CardTitle>
              <CardDescription>Group related buttons together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Default Button Group</h4>
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Middle</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Icons</h4>
                <ButtonGroup>
                  <Button variant="outline" size="icon">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Underline className="h-4 w-4" />
                  </Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badge Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Badges</h2>

          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Small status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge>
                    <CheckCircle2 className="h-3 w-3" />
                    Success
                  </Badge>
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3" />
                    Error
                  </Badge>
                  <Badge variant="secondary">
                    <Info className="h-3 w-3" />
                    Info
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Status Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge>Active</Badge>
                  <Badge variant="secondary">Pending</Badge>
                  <Badge variant="outline">Draft</Badge>
                  <Badge variant="destructive">Inactive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spinner Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Spinners</h2>

          <Card>
            <CardHeader>
              <CardTitle>Loading Spinners</CardTitle>
              <CardDescription>Loading indicators in different sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Sizes</h4>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="sm" />
                    <p className="text-xs text-muted-foreground">Small</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="default" />
                    <p className="text-xs text-muted-foreground">Default</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="lg" />
                    <p className="text-xs text-muted-foreground">Large</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="xl" />
                    <p className="text-xs text-muted-foreground">Extra Large</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Colors</h4>
                <div className="flex items-center gap-6">
                  <Spinner className="text-primary" />
                  <Spinner className="text-secondary" />
                  <Spinner className="text-accent" />
                  <Spinner className="text-destructive" />
                  <Spinner className="text-muted-foreground" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Button</h4>
                <Button disabled>
                  <Spinner size="sm" className="mr-2" />
                  Loading...
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skeleton Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Skeletons</h2>

          <Card>
            <CardHeader>
              <CardTitle>Skeleton Loaders</CardTitle>
              <CardDescription>Placeholder loading states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Shapes</h4>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Card Skeleton</h4>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">List Skeleton</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Toggle Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Toggles</h2>

          <Card>
            <CardHeader>
              <CardTitle>Toggle Buttons</CardTitle>
              <CardDescription>Toggle button states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Toggles</h4>
                <div className="flex gap-3">
                  <Toggle>
                    <Bold className="h-4 w-4" />
                  </Toggle>
                  <Toggle>
                    <Italic className="h-4 w-4" />
                  </Toggle>
                  <Toggle>
                    <Underline className="h-4 w-4" />
                  </Toggle>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Text</h4>
                <div className="flex gap-3">
                  <Toggle>
                    <Bold className="h-4 w-4 mr-2" />
                    Bold
                  </Toggle>
                  <Toggle>
                    <Italic className="h-4 w-4 mr-2" />
                    Italic
                  </Toggle>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Sizes</h4>
                <div className="flex gap-3 items-center">
                  <Toggle size="sm">Small</Toggle>
                  <Toggle size="default">Default</Toggle>
                  <Toggle size="lg">Large</Toggle>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Tabs</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Tabs</CardTitle>
                <CardDescription>Navigation between different content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@johndoe" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Make changes to your account here. Click save when you're done.
                      </p>
                      <Button>Save Changes</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input id="confirm" type="password" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Change your password here. After saving, you'll be logged out.
                      </p>
                      <Button>Change Password</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notifications-tab" />
                        <Label htmlFor="notifications-tab" className="cursor-pointer">
                          Enable notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing-tab" />
                        <Label htmlFor="marketing-tab" className="cursor-pointer">
                          Receive marketing emails
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="updates-tab" defaultChecked />
                        <Label htmlFor="updates-tab" className="cursor-pointer">
                          Product updates
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Manage your notification preferences and privacy settings.
                      </p>
                      <Button>Save Preferences</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs with Cards</CardTitle>
                <CardDescription>Organize related content in tabbed cards</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">$45,231</div>
                            <p className="text-xs text-muted-foreground">
                              +20.1% from last month
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">2,350</div>
                            <p className="text-xs text-muted-foreground">
                              +12.5% from last month
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Overview of your key metrics and performance indicators.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-4">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium mb-2">User Engagement</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Page Views</span>
                            <span className="text-sm font-medium">125,432</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Unique Visitors</span>
                            <span className="text-sm font-medium">45,231</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Bounce Rate</span>
                            <span className="text-sm font-medium">32.5%</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Detailed analytics about user behavior and engagement.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="reports" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Monthly Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on January 1, 2024
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Quarterly Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on December 31, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Annual Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on December 31, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Access and download your reports from different time periods.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Progress</h2>

          <Card>
            <CardHeader>
              <CardTitle>Progress Bars</CardTitle>
              <CardDescription>Visual indicators for task completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Different Progress Values</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">0%</span>
                    </div>
                    <Progress value={0} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">50%</span>
                    </div>
                    <Progress value={50} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Labels</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Uploading files...</span>
                      <span className="text-muted-foreground">33%</span>
                    </div>
                    <Progress value={33} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Processing data...</span>
                      <span className="text-muted-foreground">67%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Installation complete</span>
                      <span className="text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Switch Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Switches</h2>

          <Card>
            <CardHeader>
              <CardTitle>Toggle Switches</CardTitle>
              <CardDescription>Binary on/off controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Switches</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode" className="cursor-pointer">
                      Airplane Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="wifi" defaultChecked />
                    <Label htmlFor="wifi" className="cursor-pointer">
                      Wi-Fi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="bluetooth" />
                    <Label htmlFor="bluetooth" className="cursor-pointer">
                      Bluetooth
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="disabled-switch" disabled />
                    <Label htmlFor="disabled-switch" className="cursor-pointer opacity-50">
                      Disabled Switch
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Descriptions</h4>
                <div className="space-y-4">
                  <div className="flex items-start justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails" className="cursor-pointer">
                        Marketing emails
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new products and features.
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                  <div className="flex items-start justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-emails" className="cursor-pointer">
                        Security emails
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your account security.
                      </p>
                    </div>
                    <Switch id="security-emails" defaultChecked />
                  </div>
                  <div className="flex items-start justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="social-emails" className="cursor-pointer">
                        Social emails
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for friend requests and messages.
                      </p>
                    </div>
                    <Switch id="social-emails" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accordion Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Accordions</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Single Accordion</CardTitle>
                <CardDescription>Only one item can be open at a time</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                    <AccordionContent>
                      We offer a 30-day money-back guarantee. If you're not satisfied with your
                      purchase, you can request a full refund within 30 days of your purchase date.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      You can cancel your subscription at any time from your account settings. Go to
                      Settings &gt; Subscription &gt; Cancel Subscription. Your access will continue
                      until the end of your billing period.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you offer technical support?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we provide 24/7 technical support via email and live chat. Premium
                      subscribers also get access to phone support and priority response times.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I upgrade my plan later?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely! You can upgrade your plan at any time. You'll be charged a
                      prorated amount for the remainder of your billing cycle, and your new plan
                      features will be available immediately.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Accordion</CardTitle>
                <CardDescription>Multiple items can be open simultaneously</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Getting Started</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>Follow these steps to get started:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Create an account</li>
                          <li>Verify your email address</li>
                          <li>Complete your profile</li>
                          <li>Start exploring!</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Real-time collaboration</li>
                        <li>Cloud storage</li>
                        <li>Advanced analytics</li>
                        <li>Mobile apps</li>
                        <li>API access</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Pricing</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Free:</strong> $0/month - Basic features</p>
                        <p><strong>Pro:</strong> $10/month - Advanced features</p>
                        <p><strong>Enterprise:</strong> Custom pricing - All features</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pagination Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Pagination</h2>

          <Card>
            <CardHeader>
              <CardTitle>Pagination Controls</CardTitle>
              <CardDescription>Navigate through multiple pages of content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Pagination</h4>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Ellipsis</h4>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Many Pages</h4>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>6</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">7</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">20</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sonner (Toast) Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Toast Notifications</h2>

          <Card>
            <CardHeader>
              <CardTitle>Sonner Toasts</CardTitle>
              <CardDescription>Elegant toast notifications for user feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Toast Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toast("Event has been created")}
                  >
                    Default Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.success("Success!", {
                        description: "Your changes have been saved successfully.",
                      })
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.error("Error!", {
                        description: "Something went wrong. Please try again.",
                      })
                    }
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.warning("Warning!", {
                        description: "Please review your information before proceeding.",
                      })
                    }
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.info("Info", {
                        description: "This is an informational message.",
                      })
                    }
                  >
                    Info Toast
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                          label: "Undo",
                          onClick: () => toast("Undo action triggered"),
                        },
                      })
                    }
                  >
                    Toast with Action
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 2000)),
                        {
                          loading: "Loading...",
                          success: "Data loaded successfully!",
                          error: "Failed to load data",
                        }
                      )
                    }
                  >
                    Promise Toast
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Custom Duration & Position</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("This will disappear quickly", {
                        duration: 1000,
                      })
                    }
                  >
                    Short Duration (1s)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("This will stay longer", {
                        duration: 10000,
                      })
                    }
                  >
                    Long Duration (10s)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("Rich content toast", {
                        description: (
                          <div className="space-y-2">
                            <p>You can add custom JSX content here.</p>
                            <div className="flex gap-2">
                              <Badge variant="secondary">Tag 1</Badge>
                              <Badge variant="secondary">Tag 2</Badge>
                            </div>
                          </div>
                        ),
                      })
                    }
                  >
                    Rich Content
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Click the buttons above to see toast notifications in action. Toasts will appear
                  in the bottom-right corner of the screen.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Form Elements</h2>

          <Card>
            <CardHeader>
              <CardTitle>Inputs & Text Areas</CardTitle>
              <CardDescription>Form input components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="name@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-disabled">Disabled Input</Label>
                <Input
                  type="email"
                  id="email-disabled"
                  placeholder="name@example.com"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Enter your password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message-disabled">Disabled Textarea</Label>
                <Textarea
                  id="message-disabled"
                  placeholder="Type your message here..."
                  rows={4}
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Checkbox Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Checkboxes</h2>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox Options</CardTitle>
              <CardDescription>Multi-select input controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Checkboxes</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms1" />
                    <Label htmlFor="terms1" className="cursor-pointer">
                      Accept terms and conditions
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" defaultChecked />
                    <Label htmlFor="marketing" className="cursor-pointer">
                      Receive marketing emails
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="disabled" disabled />
                    <Label htmlFor="disabled" className="cursor-pointer opacity-50">
                      Disabled checkbox
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Descriptions</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="notifications" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="notifications" className="cursor-pointer">
                        Enable notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your account activity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="updates" className="mt-1" defaultChecked />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="updates" className="cursor-pointer">
                        Product updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when we ship new features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Radio Group Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Radio Groups</h2>

          <Card>
            <CardHeader>
              <CardTitle>Radio Options</CardTitle>
              <CardDescription>Single-select input controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">Basic Radio Group</h4>
                <RadioGroup defaultValue="option-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-1" id="option-1" />
                    <Label htmlFor="option-1" className="cursor-pointer">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-2" id="option-2" />
                    <Label htmlFor="option-2" className="cursor-pointer">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-3" id="option-3" />
                    <Label htmlFor="option-3" className="cursor-pointer">Option 3</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-foreground">With Descriptions</h4>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="default" id="r1" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="r1" className="cursor-pointer">Default</Label>
                      <p className="text-sm text-muted-foreground">
                        Standard spacing and sizing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="r2" className="cursor-pointer">Comfortable</Label>
                      <p className="text-sm text-muted-foreground">
                        Increased spacing for better readability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="compact" id="r3" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="r3" className="cursor-pointer">Compact</Label>
                      <p className="text-sm text-muted-foreground">
                        Dense layout to show more content
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Select Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Select Menus</h2>

          <Card>
            <CardHeader>
              <CardTitle>Select Dropdowns</CardTitle>
              <CardDescription>Dropdown selection menus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select a fruit</Label>
                <Select defaultValue="apple">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="grape">Grape</SelectItem>
                    <SelectItem value="mango">Mango</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select a framework</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Disabled Select</Label>
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="This is disabled" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="item1">Item 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Table Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Tables</h2>

          <Card>
            <CardHeader>
              <CardTitle>Data Tables</CardTitle>
              <CardDescription>Display structured data in rows and columns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right">
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell className="text-right">
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Moderator</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Alice Williams</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="destructive">Inactive</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Charlie Brown</TableCell>
                    <TableCell>charlie@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell className="text-right">
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Alerts</h2>

          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a default alert with informational content.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action was completed successfully!
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Cards</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a basic card component that can contain any content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With more content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Cards are versatile containers for grouping related content.
                </p>
                <Button className="w-full">Action</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Avatar</CardTitle>
                <CardDescription>User profile card</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Avatars</h2>

          <Card>
            <CardHeader>
              <CardTitle>Avatar Variants</CardTitle>
              <CardDescription>Different avatar sizes and states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>XL</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallback>FB</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Typography</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Headings - Bricolage Grotesque</CardTitle>
                <CardDescription>All heading levels use Bricolage Grotesque font</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H1 - 4xl / Bold</p>
                    <h1 className="text-4xl font-bold text-foreground">The quick brown fox jumps</h1>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H2 - 3xl / Bold</p>
                    <h2 className="text-3xl font-bold text-foreground">The quick brown fox jumps</h2>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H3 - 2xl / Semibold</p>
                    <h3 className="text-2xl font-semibold text-foreground">The quick brown fox jumps</h3>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H4 - xl / Semibold</p>
                    <h4 className="text-xl font-semibold text-foreground">The quick brown fox jumps</h4>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H5 - lg / Semibold</p>
                    <h5 className="text-lg font-semibold text-foreground">The quick brown fox jumps</h5>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">H6 - base / Semibold</p>
                    <h6 className="text-base font-semibold text-foreground">The quick brown fox jumps</h6>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Text - Source Sans 3</CardTitle>
                <CardDescription>All body text uses Source Sans 3 font</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Large - lg / Regular (400)</p>
                    <p className="text-lg text-foreground">
                      The quick brown fox jumps over the lazy dog. This is large body text for emphasis.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Base - base / Regular (400)</p>
                    <p className="text-base text-foreground">
                      The quick brown fox jumps over the lazy dog. This is standard body text used throughout the application.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Base - base / Semibold (600)</p>
                    <p className="text-base font-semibold text-foreground">
                      The quick brown fox jumps over the lazy dog. This is bold body text for emphasis.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Small - sm / Regular (400)</p>
                    <p className="text-sm text-foreground">
                      The quick brown fox jumps over the lazy dog. This is small text for secondary content.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Small - sm / Muted</p>
                    <p className="text-sm text-muted-foreground">
                      The quick brown fox jumps over the lazy dog. This is muted text for captions and helper text.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Extra Small - xs / Muted</p>
                    <p className="text-xs text-muted-foreground">
                      The quick brown fox jumps over the lazy dog. This is extra small text for labels and metadata.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography in Context</CardTitle>
                <CardDescription>See how the fonts work together</CardDescription>
              </CardHeader>
              <CardContent>
                <article className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Welcome to Your Gratitude Journal
                  </h3>
                  <p className="text-foreground mb-4">
                    Take a moment each day to reflect on what you're grateful for. Research shows
                    that practicing gratitude can improve mental health, strengthen relationships,
                    and increase overall life satisfaction.
                  </p>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    How It Works
                  </h4>
                  <p className="text-foreground mb-4">
                    Start by writing down three things you're grateful for each day. They can be
                    big or small—what matters is that you take the time to acknowledge them.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Remember: There's no wrong way to practice gratitude. Just be honest and
                    consistent with your reflections.
                  </p>
                </article>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
