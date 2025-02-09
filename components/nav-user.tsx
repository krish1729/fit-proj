import { SignedIn, UserButton } from "@clerk/nextjs";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";

export async function NavUser() {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress || "";
  const username = emailAddress.split("@")[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <SignedIn>
            <UserButton />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{username}</span>
              <span className="truncate text-xs">{emailAddress}</span>
            </div>
          </SignedIn>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
