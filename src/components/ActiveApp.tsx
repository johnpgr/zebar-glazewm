import type { OutputMap } from "@/lib/providers"

const AppIcon = ({ appId }: { appId: string }) => {
  if (/spotify/i.test(appId)) {
    return <i className="text-primary nf-md-spotify"></i>
  } else if (/msedge|edge/i.test(appId)) {
    return <i className="text-primary nf-md-web"></i>
  } else if (/code|vscode|visual studio/i.test(appId)) {
    return <i className="text-primary nf-dev-visualstudio"></i>
  } else if (/obs/i.test(appId)) {
    return <i className="text-primary nf-fa-video_camera"></i>
  } else if (/zoom/i.test(appId)) {
    return <i className="text-primary nf-md-video"></i>
  } else if (/telegram/i.test(appId)) {
    return <i className="text-primary nf-md-telegram"></i>
  } else if (/whatsapp/i.test(appId)) {
    return <i className="text-primary nf-md-whatsapp"></i>
  } else if (/steam/i.test(appId)) {
    return <i className="text-primary nf-md-steam"></i>
  } else if (/minecraft/i.test(appId)) {
    return <i className="text-primary nf-fa-cube"></i>
  } else if (/terminal|powershell/i.test(appId)) {
    return <i className="text-primary nf-oct-terminal"></i>
  } else if (/file explorer|explorer/i.test(appId)) {
    return <i className="text-primary nf-fa-folder_open"></i>
  } else if (/chrome/i.test(appId)) {
    return <i className="text-primary nf-fa-chrome"></i>
  } else if (/firefox/i.test(appId)) {
    return <i className="text-primary nf-fa-firefox"></i>
  } else if (/discord/i.test(appId)) {
    return <i className="text-primary nf-md-discord"></i>
  } else if (/notepad\+\+/i.test(appId)) {
    return <i className="text-primary nf-md-note_text"></i>
  } else if (/photoshop/i.test(appId)) {
    return <i className="text-primary nf-dev-photoshop"></i>
  } else if (/illustrator/i.test(appId)) {
    return <i className="text-primary nf-dev-illustrator"></i>
  } else if (/excel/i.test(appId)) {
    return <i className="text-primary nf-md-microsoft_excel"></i>
  } else if (/word/i.test(appId)) {
    return <i className="text-primary nf-md-microsoft_word"></i>
  } else if (/powerpoint/i.test(appId)) {
    return <i className="text-primary nf-md-microsoft_powerpoint"></i>
  } else {
    return <i className="text-primary nf-md-application"></i>
  }
}

export const ActiveApp: React.FC<{ output: OutputMap }> = ({ output }) => {
  return (
    <>
      {output.glazewm && output.glazewm.focusedWorkspace && (
        <div className="flex items-center gap-1">
          {output.glazewm.focusedWorkspace.children.map(
            (child) =>
              child.type === "window" && (
                <AppIcon key={child.id} appId={child.processName} />
              ),
          )}
        </div>
      )}
    </>
  )
}
