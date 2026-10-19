import { Pencil } from "lucide-react";
import { useState } from "react";

import { renameMember, setActiveMember, useAppState } from "#src/lib/store.ts";

export const MemberSwitcher = () => {
  const state = useAppState();
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-1.5">
        {state.members.map((member) => {
          const active = member.id === state.activeMemberId;

          return (
            <button
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              key={member.id}
              onClick={() => {
                setActiveMember(member.id);
              }}
              type="button"
            >
              {member.name}
            </button>
          );
        })}
        <button
          aria-label="重命名成员"
          className="text-muted-foreground hover:text-foreground ml-auto cursor-pointer rounded-full p-1.5 transition-colors"
          onClick={() => {
            setEditing((prev) => !prev);
          }}
          type="button"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>

      {editing ? (
        <div className="mt-2 grid gap-1.5">
          {state.members.map((member) => (
            <input
              className="border-input bg-background focus-visible:border-ring w-full rounded-md border px-2.5 py-1.5 text-xs outline-none"
              defaultValue={member.name}
              key={member.id}
              onBlur={(event) => {
                renameMember(member.id, event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
              }}
            />
          ))}
          <p className="text-muted-foreground text-mini">
            改完点别处保存。三人的进度各自记在各自手机上。
          </p>
        </div>
      ) : null}
    </div>
  );
};
