// themeConfig.ts
// 将来的にバックエンドから受け取る予定の設定値
// バックエンドから取得する場合は fetch('/api/theme') などに置き換える

export const themeConfig = {
  // カラー設定
  primaryColor: "#c0392b",       // メインカラー（赤）
  primaryHover: "#a93226",       // ホバー時のメインカラー
  backgroundColor: "#f8f5f0",   // 背景色
  surfaceColor: "#ffffff",       // カード・パネルの背景色
  borderColor: "#e8e0d8",        // ボーダーカラー
  textPrimary: "#2c2c2c",        // メインテキスト
  textSecondary: "#888888",      // サブテキスト
  textMuted: "#aaaaaa",          // 薄いテキスト
  accentBackground: "#fdf6f0",   // アクティブ背景色
  darkSurface: "#2c2c2c",        // ダーク背景（合計欄など）

  // フォント設定
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSizeSmall: "11px",
  fontSizeBase: "13px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeXLarge: "18px",
  fontSizeTitle: "20px",

  // ショップ情報
  shopName: "Cafe QR Order",
  logoText: "QR",
};

export type ThemeConfig = typeof themeConfig;
