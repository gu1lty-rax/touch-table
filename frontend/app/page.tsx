export default function CafeMenu() {
  const menuItems = [
    { id: 1, name: "楽しい選べるランチ♪", desc: "3種類から選べるスープランチ", price: "1,100", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80" },
    { id: 2, name: "日替わりランチ", desc: "新鮮野菜のプレート", price: "850", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
    { id: 3, name: "鶏むね肉とサラダプレート", desc: "ヘルシーでボリューム満点", price: "800", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* ヘッダー：globals.cssで設定した brand-green を使用 */}
      <header className="bg-[#76b900] text-white p-4 text-center font-bold text-xl sticky top-0 z-10 shadow-md">
        TAP & ORDER CAFE
      </header>

      {/* サブヘッダー */}
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-2 py-1 rounded">人気メニュー</span>
      </div>

      {/* メニューリスト：globals.cssの menu-card を使用 */}
      <main className="p-2">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card flex items-stretch border-b border-gray-100">
            {/* 左側：画像 */}
            <div className="w-1/3 aspect-square bg-gray-200 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            {/* 右側：詳細 */}
            <div className="w-2/3 p-3 flex flex-col justify-between relative">
              <div>
                <h2 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h2>
                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                <p className="text-sm font-bold text-gray-700">{item.price}円</p>
              </div>
              {/* 矢印アイコン風 */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs">
                ＞
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* フッター：dark-green を使用 */}
      <footer className="fixed bottom-0 w-full max-w-md bg-[#3d5a2d] text-white flex justify-around p-2 text-[10px]">
        <div className="text-center">Language</div>
        <div className="text-center">トップに戻る</div>
        <div className="text-center">会計呼出</div>
        <div className="text-center">注文履歴</div>
        <div className="text-center">カート</div>
      </footer>
    </div>
  );
}