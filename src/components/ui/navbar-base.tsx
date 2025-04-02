import { Menu } from "lucide-react"
import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: JSX.Element
  items?: MenuItem[]
}

interface Navbar1Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  mobileExtraLinks?: {
    name: string
    url: string
  }[]
  auth?: {
    login: {
      text: string
      url: string
    }
    signup: {
      text: string
      url: string
    }
  }
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/images/1.png",
    alt: "TWISTLY",
    title: "TWISTLY",
  },
  menu = [],
  auth = {
    login: { text: "Sign in", url: "/signin" },
    signup: { text: "Get Started", url: "/signup" },
  },
}: Navbar1Props) => {
  return (
    <section className="py-2">
      <div className="container">
        {/* Desktop Navigation */}
        <nav className="hidden h-14 items-center justify-between lg:flex">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={logo.src}
                alt="TWISTLY"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-light text-xl tracking-wide hidden sm:block">
              TWISTLY
            </span>
          </a>

          {/* Main Navigation */}
          <div className="flex flex-1 items-center justify-center px-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href={auth.login.url}>{auth.login.text}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.text}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex h-14 items-center justify-between lg:hidden">
          {/* Mobile Logo */}
          <a href={logo.url} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src={logo.src}
                alt="TWISTLY"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-light text-lg tracking-wide">
              TWISTLY
            </span>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader className="mb-4">
                <SheetTitle asChild>
                  <a href={logo.url} className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={logo.src}
                        alt="TWISTLY"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="font-light text-lg tracking-wide">
                      TWISTLY
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <Accordion type="single" collapsible>
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="flex flex-col gap-2 pt-4">
                  <Button asChild variant="outline" className="w-full">
                    <a href={auth.login.url}>{auth.login.text}</a>
                  </Button>
                  <Button asChild className="w-full">
                    <a href={auth.signup.url}>{auth.signup.text}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="h-9">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <a
                    href={subItem.url}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      {subItem.icon}
                      <span className="text-sm font-medium">{subItem.title}</span>
                    </div>
                    {subItem.description && (
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {subItem.description}
                      </p>
                    )}
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <a
          href={item.url}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          {item.title}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger className="text-sm">{item.title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.url}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {subItem.icon}
                <div>
                  <div className="font-medium">{subItem.title}</div>
                  {subItem.description && (
                    <p className="text-xs text-muted-foreground">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {item.title}
    </a>
  )
}

export { Navbar1 } 