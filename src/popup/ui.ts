import type { Session } from "./types";
import { createSessionItem } from "./components/SessionItem";

// Add type for callbacks
export type DeleteCallback = (index: number) => void;
export type RestoreCallback = (session: Session) => void;
export type ReorderCallback = (src: number, dest: number) => void;
export type RenameCallback = (index: number, currentName: string) => void;

export function renderSessions(
  sessions: Session[],
  sessionList: HTMLElement,
  emptyState: HTMLElement | null,
  onDelete: DeleteCallback,
  onRestore: RestoreCallback,
  onReorder: ReorderCallback,
  onInitiateRename: RenameCallback,
  activeSessionName: string | null
) {
  if (!sessionList) return;
  sessionList.innerHTML = "";
  if (sessions.length === 0) {
    if (emptyState) sessionList.appendChild(emptyState);
    return;
  }

  sessions.forEach((session, index) => {
    const isActive = session.name === activeSessionName;
    const sessionItem = createSessionItem(
      session,
      index,
      isActive,
      onRestore,
      onDelete,
      onInitiateRename,
      onReorder
    );
    sessionList.appendChild(sessionItem);
  });
}
