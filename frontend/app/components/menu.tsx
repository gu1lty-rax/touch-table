"use client";

import { useState } from "react";
import Navigation from "./navigation";
import { themeConfig } from "./themeConfig";

type Category =
  | "すべて"
  | "シェフのおすすめ"
  | "本日のランチ"
  | "肉料理"
  | "パスタ"
  | "ピザ"
  | "ご飯もの"
  | "サラダ"
  | "アラカルト";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, "すべて">;
  image: string;
  description?: string;
};

type CartItem = MenuItem & { quantity: number };
type Tab = "メニュー" | "注文履歴" | "お会計";

const menuItems: MenuItem[] = [
  { id: 1, name: "ゴロゴロ具材の入ったピリ辛グリーンカレー", price: 980, category: "シェフのおすすめ", image: "🍛", description: "厳選した食材を使ったシェフおすすめメニュー" },
  { id: 2, name: "4種のチーズを使った自家製ピザ", price: 1400, category: "ピザ", image: "🍕" },
  { id: 3, name: "自家製ハンバーグ", price: 980, category: "肉料理", image: "🍔" },
  { id: 4, name: "鮭といくらのクリームパスタ", price: 1200, category: "パスタ", image: "🍝" },
  { id: 5, name: "本日の日替わりランチ", price: 850, category: "本日のランチ", image: "🍱", description: "毎日変わる特製ランチ" },
  { id: 6, name: "シーザーサラダ", price: 680, category: "サラダ", image: "🥗" },
  { id: 7, name: "ガーリックライス", price: 580, category: "ご飯もの", image: "🍚" },
  { id: 8, name: "唐揚げ", price: 680, category: "アラカルト", image: "🍗" },
];

const categories: Category[] = [
  "すべて", "シェフのおすすめ", "本日のランチ", "肉料理",
  "パスタ", "ピザ", "ご飯もの", "サラダ", "アラカルト",
];

export default function Menu() {
  const theme = themeConfig; // 将来: const theme = await fetchTheme();

  const [activeTab, setActiveTab] = useState<Tab>("メニュー");
  const [activeCategory, setActiveCategory] = useState<Category>("すべて");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<CartItem[]>([]);

  const filteredMenu = activeCategory === "すべて"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (menuItem: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === menuItem.id);
      if (existing) {
        return prev.map(c => c.id === menuItem.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prev.filter(c => c.id !== id);
    });
  };

  const getQuantity = (id: number) => cart.find(c => c.id === id)?.quantity ?? 0;

  const handleOrder = () => {
    setOrderHistory(prev => [...prev, ...cart]);
    setCart([]);
    setActiveTab("注文履歴");
  };

  return (
    <div style={{
      fontFamily: theme.fontFamily,
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      backgroundColor: theme.backgroundColor,
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* ナビゲーション */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* メニュータブ */}
      {activeTab === "メニュー" && (
        <div style={{ flex: 1, display: "flex" }}>
          {/* カテゴリサイドバー */}
          <div style={{
            width: 90,
            backgroundColor: theme.surfaceColor,
            borderRight: `1px solid ${theme.borderColor}`,
            overflowY: "auto",
            flexShrink: 0,
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  width: "100%",
                  padding: "14px 8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: theme.fontSizeSmall,
                  fontWeight: activeCategory === cat ? 700 : 400,
                  fontFamily: theme.fontFamily,
                  backgroundColor: activeCategory === cat ? theme.accentBackground : "transparent",
                  color: activeCategory === cat ? theme.primaryColor : theme.textSecondary,
                  borderLeft: activeCategory === cat
                    ? `3px solid ${theme.primaryColor}`
                    : "3px solid transparent",
                  textAlign: "center",
                  lineHeight: 1.4,
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* メニュー一覧 */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 120px" }}>
            {activeCategory !== "すべて" && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: theme.fontSizeBase, fontWeight: 700, color: theme.textPrimary, marginBottom: 2 }}>
                  ■ {activeCategory}
                </div>
                {activeCategory === "シェフのおすすめ" && (
                  <div style={{ fontSize: theme.fontSizeSmall, color: theme.textSecondary }}>
                    厳選した食材を使ったシェフおすすめメニューです。
                  </div>
                )}
              </div>
            )}

            {filteredMenu.map(item => {
              const qty = getQuantity(item.id);
              return (
                <div key={item.id} style={{
                  backgroundColor: theme.surfaceColor,
                  borderRadius: 10,
                  marginBottom: 10,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    height: 140,
                    backgroundColor: theme.accentBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                  }}>
                    {item.image}
                  </div>
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div style={{ fontSize: theme.fontSizeMedium, fontWeight: 600, color: theme.textPrimary, marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: theme.fontSizeLarge, fontWeight: 700, color: theme.primaryColor }}>
                        {item.price.toLocaleString()}円
                        <span style={{ fontSize: theme.fontSizeSmall, color: theme.textMuted, fontWeight: 400 }}>（税込）</span>
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {qty > 0 && (
                          <>
                            <button onClick={() => removeFromCart(item.id)} style={{
                              width: 28, height: 28, borderRadius: "50%",
                              border: `1.5px solid ${theme.borderColor}`,
                              backgroundColor: theme.surfaceColor,
                              cursor: "pointer", fontSize: 16, color: theme.textSecondary,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>−</button>
                            <span style={{ fontSize: theme.fontSizeLarge, fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                              {qty}
                            </span>
                          </>
                        )}
                        <button onClick={() => addToCart(item)} style={{
                          width: 28, height: 28, borderRadius: "50%",
                          border: "none", backgroundColor: theme.primaryColor,
                          cursor: "pointer", fontSize: 18, color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 注文履歴タブ */}
      {activeTab === "注文履歴" && (
        <div style={{ flex: 1, padding: 16, paddingBottom: 100 }}>
          <div style={{ fontSize: theme.fontSizeLarge, fontWeight: 700, color: theme.textPrimary, marginBottom: 12 }}>
            注文履歴
          </div>
          {orderHistory.length === 0 ? (
            <div style={{ textAlign: "center", color: theme.textMuted, marginTop: 60, fontSize: theme.fontSizeMedium }}>
              注文履歴はありません
            </div>
          ) : (
            orderHistory.map((item, i) => (
              <div key={i} style={{
                backgroundColor: theme.surfaceColor, borderRadius: 10, padding: "12px 14px",
                marginBottom: 8, display: "flex", justifyContent: "space-between",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <div>
                  <div style={{ fontSize: theme.fontSizeMedium, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: theme.fontSizeBase, color: theme.textMuted, marginTop: 2 }}>×{item.quantity}</div>
                </div>
                <div style={{ fontSize: theme.fontSizeMedium, fontWeight: 700, color: theme.primaryColor }}>
                  {(item.price * item.quantity).toLocaleString()}円
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* お会計タブ */}
      {activeTab === "お会計" && (
        <div style={{ flex: 1, padding: 16, paddingBottom: 100 }}>
          <div style={{ fontSize: theme.fontSizeLarge, fontWeight: 700, color: theme.textPrimary, marginBottom: 12 }}>
            お会計
          </div>
          {orderHistory.length === 0 ? (
            <div style={{ textAlign: "center", color: theme.textMuted, marginTop: 60, fontSize: theme.fontSizeMedium }}>
              注文がありません
            </div>
          ) : (
            <>
              {orderHistory.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: theme.surfaceColor, borderRadius: 10, padding: "12px 14px",
                  marginBottom: 8, display: "flex", justifyContent: "space-between",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: theme.fontSizeBase }}>{item.name} ×{item.quantity}</div>
                  <div style={{ fontSize: theme.fontSizeBase, fontWeight: 600 }}>
                    {(item.price * item.quantity).toLocaleString()}円
                  </div>
                </div>
              ))}
              <div style={{
                backgroundColor: theme.darkSurface, borderRadius: 10, padding: "14px 16px",
                marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#fff", fontSize: theme.fontSizeLarge, fontWeight: 700 }}>合計</span>
                <span style={{ color: "#fff", fontSize: theme.fontSizeTitle, fontWeight: 700 }}>
                  {orderHistory.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}円
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* カート下部バー */}
      {activeTab === "メニュー" && cart.length > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 430, backgroundColor: theme.surfaceColor,
          borderTop: `1px solid ${theme.borderColor}`, padding: "12px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 200, boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
        }}>
          <div>
            <div style={{ fontSize: theme.fontSizeBase, color: theme.textSecondary }}>
              数量 <span style={{ fontWeight: 700, color: theme.textPrimary }}>{totalQuantity}</span>
            </div>
            <div style={{ fontSize: theme.fontSizeBase, color: theme.textSecondary }}>
              合計金額{" "}
              <span style={{ fontSize: theme.fontSizeXLarge, fontWeight: 700, color: theme.textPrimary }}>
                {totalPrice.toLocaleString()}円
              </span>
              <span style={{ fontSize: "10px", color: theme.textMuted }}>（税込）</span>
            </div>
          </div>
          <button onClick={handleOrder} style={{
            backgroundColor: theme.primaryColor, color: "#fff",
            border: "none", borderRadius: 24, padding: "12px 24px",
            fontSize: theme.fontSizeLarge, fontWeight: 700, cursor: "pointer",
            fontFamily: theme.fontFamily,
          }}>
            注文に進む
          </button>
        </div>
      )}

      {/* メニューに戻るボタン */}
      {activeTab !== "メニュー" && (
        <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 200 }}>
          <button onClick={() => setActiveTab("メニュー")} style={{
            backgroundColor: theme.primaryColor, color: "#fff",
            border: "none", borderRadius: 24, padding: "12px 32px",
            fontSize: theme.fontSizeMedium, fontWeight: 700, cursor: "pointer",
            fontFamily: theme.fontFamily,
            boxShadow: `0 4px 12px ${theme.primaryColor}66`,
          }}>
            ＋ メニューに戻る
          </button>
        </div>
      )}
    </div>
  );
}
