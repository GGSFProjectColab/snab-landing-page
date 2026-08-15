"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import {
  Briefcase,
  FileText,
  LogOut,
  Mail,
  Newspaper,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Applications",
    pathname: "/admin/careers",
    view: "applications",
    icon: FileText,
  },
  {
    title: "Jobs",
    pathname: "/admin/careers",
    view: "jobs",
    icon: Briefcase,
  },
  {
    title: "Blogs",
    pathname: "/admin/blogs",
    view: null,
    icon: Newspaper,
  },
  {
    title: "Contacts",
    pathname: "/admin/contacts",
    view: null,
    icon: Mail,
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentView = searchParams.get("view") || "applications"

  const isLoginPage = pathname === "/admin"

  async function logout() {
    await fetch("/api/admin/careers/session", { method: "DELETE" });
    router.replace("/admin");
  }

  if (isLoginPage) {
    return (
      <NextThemesProvider attribute="class" forcedTheme="dark">
        {children}
      </NextThemesProvider>
    )
  }

  return (
    <NextThemesProvider attribute="class" forcedTheme="dark">
      <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/admin/careers?view=applications">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <span className="font-pixelify text-xs font-bold">SN</span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">SNAB Admin</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = pathname === item.pathname && (item.view === null || currentView === item.view)
                  const url = item.view ? `${item.pathname}?view=${item.view}` : item.pathname
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} tooltip="Log out">
                <LogOut />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-svh flex flex-col">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-dotted border-edge bg-background/95 backdrop-blur px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <span className="font-pixelify text-xs uppercase tracking-wider text-muted-foreground">
            Admin Panel
          </span>
        </header>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </SidebarInset>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
