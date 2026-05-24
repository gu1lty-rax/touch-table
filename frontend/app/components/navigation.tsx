"use client";

import { themeConfig } from "./themeConfig";

type Tab = "メニュー" | "注文履歴" | "お会計";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export default function Navigation({ activeTab, onTabChange }: Props) {
  const theme = themeConfig; // 将来: const theme = await fetchTheme();

  return (
    <div style={{
      backgroundColor: theme.surfaceColor,
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${theme.borderColor}`,
      position: "sticky",
      top: 0,
      zIndex: 100,
      fontFamily: theme.fontFamily,
    }}>
      {/* ロゴ */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: theme.primaryColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: theme.fontSizeBase,
          color: "#fff",
          fontWeight: "bold",
        }}>
          {theme.logoText}
        </div>
        <span style={{
          fontWeight: 700,
          fontSize: theme.fontSizeLarge,
          color: theme.textPrimary,
        }}>
          {theme.shopName}
        </span>
      </div>

      {/* タブボタン */}
      <div style={{ display: "flex", gap: 4 }}>
        {(["注文履歴", "お会計"] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: theme.fontSizeBase,
              fontWeight: 600,
              fontFamily: theme.fontFamily,
              backgroundColor: activeTab === tab ? theme.darkSurface : theme.accentBackground,
              color: activeTab === tab ? "#fff" : theme.textSecondary,
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
