# BỘ PROMPT THIẾT KẾ GIAO DIỆN STITCH — DỰ ÁN QR WAIT

> **Căn cứ:** `BRD_QR_Wait.md` v1.3, `SRS_QR_Wait.md` v1.2 (Mục 7: UI/UX Requirements) và Website tham chiếu `https://qrwait.app/vi/`.  
> **Cách dùng với Stitch MCP:** Nạp **Phần 1 (Design System)** trước để khóa nhận diện chung, sau đó sinh lần lượt từng màn hình ở **Phần 2** theo đúng `deviceType` (`MOBILE` / `TABLET` / `DESKTOP`) để đảm bảo đủ chi tiết và không bỏ sót trạng thái nghiệp vụ.

---

## PHẦN 1: QUY CHUẨN DESIGN SYSTEM CHUNG (DESIGN.md / THEME)

* **Phong cách thị giác:** Tối giản chuẩn SaaS cao cấp (giống Linear / Vercel / `https://qrwait.app/vi/`), dùng nền **trắng tinh `#FFFFFF` / xám rất nhạt `#F9FAFB`** với **viền mảnh `1px solid #E5E7EB`**, khoảng trắng thoáng rộng, tuyệt đối **không lạm dụng nền tím hoặc nhồi nhiều badge màu mè kiểu template AI**.
* **Chế độ Sáng / Tối (Light & Dark Mode):** Mặc định dùng **Light Mode đồng nhất trên tất cả màn hình (kể cả TV Display `SCR-08`)**, đồng thời tích hợp **nút chuyển đổi giao diện Sáng / Tối (Sun/Moon Toggle)** trên Header của `SCR-05`, `SCR-08`, `SCR-03`, `SCR-11`.
* **Bảng màu chuẩn:**
  * Màu chủ đạo (Primary Accent): Indigo Blue `#4F46E5` (chỉ dùng cho nút CTA chính và chi tiết thật sự cần nhấn)
  * Màu trạng thái tiết chế: Xanh lá `#10B981`, Vàng hổ phách `#F59E0B`, Xanh dương `#3B82F6`, Đỏ `#EF4444`.
* **Typography & Số vé:** Font `Inter` hoặc `Be Vietnam Pro` hỗ trợ hoàn chỉnh tiếng Việt. **Mọi số vé (`#A-025`) phải hiển thị trên 1 dòng duy nhất (`whitespace-nowrap`), không bao giờ ngắt xuống dòng.** Cỡ chữ mô tả nhỏ gọn, thanh thoát.
* **Kích thước & Bo góc:** Bo tròn mềm mại (`12px` cho thẻ và nút chính). Kích thước vùng chạm trên Mobile/Tablet tối thiểu `48x48px` (nút chính `>= 52px`).
* **Ngôn ngữ hiển thị:** Tiếng Việt hoàn toàn (trừ các từ khóa kỹ thuật quen thuộc nếu cần như `Walk-in`, `Session QR`, `CSV`, `TTS`).
* **Ràng buộc loại trừ & Âm thanh (Constraints):**
  1. **KHÔNG** thiết kế bất kỳ mục nào liên quan đến Bảng giá (Pricing), Gói cước (Subscription Plans), Nạp lượt vé hay Thanh toán (Billing).
  2. **KHÔNG** thiết kế phần Open API & Webhooks (đã tạm dừng để tập trung luồng lõi).
  3. **KHÔNG** yêu cầu khách hàng nhập Số điện thoại, Email hay CCCD trên màn hình Check-in (chỉ bắt buộc nhập Tên).
  4. **TV Display (`SCR-08`):** Hỗ trợ chuông "Ding Dong" kết hợp giọng đọc **Text-to-Speech (TTS)** mời khách tới quầy, kèm **công tắc Bật/Tắt TTS** linh hoạt.
  5. **Mã QR:** Không xoay 30s tự động; dùng QR mặc định cố định theo Queue kết hợp nút **"Đổi mã QR mới"** thủ công (hoặc tự đổi theo Ca) + GPS Radius.

---

## PHẦN 2: PROMPT CHI TIẾT CHO TỪNG MÀN HÌNH (SCR-01 ĐẾN SCR-11)

### ĐỢT 1 — LUỒNG KHÁCH HÀNG (`deviceType: MOBILE` — 375px)

#### 1. `SCR-06`: Màn hình Khách hàng Lấy số (Customer Check-in Form)
```text
Thiết kế màn hình Mobile Web PWA (375px) tối giản chuẩn SaaS cao cấp (giống qrwait.app/vi/, Linear) cho khách hàng lấy số thứ tự (SCR-06), nền trắng tinh #FFFFFF (KHÔNG dùng nền tím hay viền dày màu tím), đường viền mảnh #E5E7EB, màu nhấn Indigo #4F46E5 tiết chế, tiếng Việt hoàn toàn.
Bố cục dọc gọn gàng, chữ tinh tế nhỏ gọn:
- Góc trên phải có nút nhỏ chuyển Sáng/Tối (Sun/Moon icon).
- Header căn giữa thanh thoát: Logo nhỏ gọn, tên quán ("QR-Wait Queue") và nhãn phụ nhỏ "Chi nhánh Quận 1 • Bàn 1–4 người".
- Thanh trạng thái gọn 1 dòng viền mảnh #E5E7EB nền #F9FAFB: "Hiện có 3 nhóm đang chờ • Dự kiến ~10 phút".
- Ô nhập "Tên của bạn *" (viền mảnh #D1D5DB, chữ gọn, placeholder: "Nhập tên để gọi số (VD: Anh Nam)").
- Ô nhập "Ghi chú (Không bắt buộc)" (gọn nhẹ).
- Bộ chọn "Số lượng người" dạng segmented pill sạch sẽ: 1, 2, 3, 4, 5+ (chọn sẵn 2).
- Nút CTA sắc nét màu #4F46E5 (bo góc 8px, cao 48px): "Lấy số ngay".
- Dòng nhỏ màu xám nhạt ở chân trang: "Không cần cài app • Không lưu số điện thoại".
```

#### 2. `SCR-07` (Biến thể 1 — `WAITING`): Màn hình Vé chờ Trực tiếp (Đang chờ)
```text
Thiết kế màn hình Mobile Web PWA (375px) cho khách hàng theo dõi vé chờ thời gian thực ở trạng thái ĐANG CHỜ (SCR-07 - WAITING) của hệ thống QR Wait, phong cách tối giản giống qrwait.app/vi/, màu chủ đạo #4F46E5, tiếng Việt.
Thành phần gồm:
- Header nhỏ gọn: Logo cửa hàng, tên chi nhánh và hàng chờ ("Bàn 1–4 người").
- Thẻ trung tâm nổi bật nền trắng đổ bóng nhẹ, hiển thị số vé cực lớn đậm nét: "#A-025", bên dưới là dòng "Chào bạn, Anh Nam • Nhóm 2 người" và badge trạng thái màu hổ phách "Đang chờ phục vụ".
- Hai thẻ chỉ số song song: "Còn 2 nhóm phía trước bạn" và "Dự kiến ~10 phút".
- Thanh tiến trình 4 bước trực quan (Stepper): Đã lấy số (xong) -> Đang chờ (đang hoạt động) -> Tới lượt -> Đang phục vụ.
- Nút phụ chữ nhỏ màu xám/đỏ nhạt ở cuối màn hình: "Hủy lượt chờ".
```

#### 3. `SCR-07` (Biến thể 2 — `CALLED`): Màn hình Cảnh báo Tới lượt
```text
Thiết kế biến thể trạng thái TỚI LƯỢT (CALLED) của màn hình Mobile Vé chờ (SCR-07) trên QR Wait, tiếng Việt.
Giữ nguyên khung Mobile PWA 375px nhưng toàn bộ thẻ trung tâm/nền chuyển sang màu xanh lá cây rực rỡ (#10B981) gây chú ý mạnh:
- Icon chuông rung nổi bật ở trên cùng.
- Dòng tiêu đề cực lớn: "TỚI LƯỢT BẠN!".
- Số vé "#A-025" và chỉ dẫn rõ ràng nổi bật: "VUI LÒNG ĐẾN QUẦY 01".
- Nút bấm cực lớn tương phản cao ở trung tâm: "TÔI ĐANG ĐẾN" (để khách xác nhận với nhân viên).
- Dòng nhắc nhỏ bên dưới: "Đã thông báo tới nhân viên khi bạn bấm nút. Vui lòng xuất trình màn hình này tại quầy." (Ẩn nút hủy vé).
```

#### 4. `SCR-07` (Biến thể 3 — `NO_SHOW`): Màn hình Đếm ngược Vắng mặt 15 phút
```text
Thiết kế biến thể trạng thái VẮNG MẶT (NO_SHOW) của màn hình Mobile Vé chờ (SCR-07) trên QR Wait, tiếng Việt.
Chuyển sang tông màu cảnh báo vàng cam (#F59E0B) rõ ràng:
- Icon đồng hồ cát/cảnh báo ở trên cùng.
- Tiêu đề in đậm: "BẠN ĐANG BỊ ĐÁNH DẤU VẮNG MẶT".
- Số vé "#A-025" (Anh Nam).
- Đồng hồ đếm ngược cực lớn ở trung tâm chạy lùi từng giây: "14:59" kèm dòng phụ "Thời gian ân hạn còn lại".
- Hộp hướng dẫn rõ ràng: "Vui lòng quay lại Quầy 01 và xuất trình màn hình này trong vòng 15 phút để được nhân viên phục hồi lượt. Quá 15 phút vé sẽ tự động hủy vĩnh viễn và bạn phải quét lại mã QR."
```

#### 5. `SCR-07` (Biến thể 4 — `CANCELLED`): Màn hình Vé đã Hủy
```text
Thiết kế biến thể trạng thái ĐÃ HỦY (CANCELLED) của màn hình Mobile Vé chờ (SCR-07) trên QR Wait, tiếng Việt.
Tông màu xám trung tính tối giản:
- Icon dấu X tròn màu đỏ nhạt (#EF4444) hoặc xám.
- Tiêu đề: "LƯỢT VÉ ĐÃ BỊ HỦY" kèm lý do rõ ràng: "Vé #A-025 đã bị hủy tự động do quá 15 phút không có mặt tại quầy."
- Nút CTA lớn màu Indigo (#4F46E5): "Quét mã lấy số mới".
```

---

### ĐỢT 2 — BẢNG ĐIỀU KHIỂN NHÂN VIÊN (`deviceType: TABLET` hoặc `MOBILE`)

#### 6. `SCR-05`: Bảng điều khiển Nhân viên 1 Chạm (Staff Calling Panel)
```text
Thiết kế màn hình Bảng điều khiển Nhân viên (SCR-05 - Staff Panel) theo phong cách tối giản chuyên nghiệp kiểu Linear / Stripe / qrwait.app/vi/, nền trắng #FFFFFF & xám nhạt #F9FAFB với viền mảnh #E5E7EB (KHÔNG dùng nhiều pill màu cầu vồng kiểu AI), hỗ trợ chuyển Sáng/Tối, tiếng Việt gọn gàng.
Bố cục gồm:
- Top bar mỏng gọn: Tên quán + Dropdown chọn quầy ("Quầy 01"), nút chuyển Sáng/Tối (Sun/Moon), và nút "+ Khách Walk-in" viền mảnh.
- Thẻ khách đang xử lý (trung tâm, sạch sẽ):
  - Số vé `#A-025` (HIỂN THỊ TRÊN 1 DÒNG DUY NHẤT `whitespace-nowrap`, tuyệt đối không xuống dòng), bên cạnh là tên "Nguyễn Văn A • 4 người", ghi chú nhỏ "Có ghế trẻ em".
  - Chấm xanh nhỏ tinh tế "Khách báo đã tới" và đồng hồ đếm 2 phút nhỏ gọn "Chờ ra quầy: 01:42 / 02:00".
  - Cụm nút thao tác sạch sẽ, tiết chế màu: Nút chính "Bắt đầu phục vụ" (#4F46E5), các nút phụ viền mảnh gọn gàng: "Gọi lại (1/3 • 12s)", "Vắng mặt", "Hoàn tất", "Chuyển vé".
- Danh sách chờ bên dưới dạng bảng/dòng mảnh gọn (cỡ chữ 13px):
  - Tab "Đang chờ (12)" | "Vắng mặt 15p (2)".
  - Mỗi dòng hiển thị số vé trên 1 dòng duy nhất (`#A-026`, `#A-027` tuyệt đối không rớt 2 dòng), Tên khách, số người, thời gian chờ và 1 nút "Gọi".
- Thanh đáy cố định tối giản với nút chính màu #4F46E5: "Gọi tiếp theo (#A-026)".
```

---

### ĐỢT 3 — MÀN HÌNH SẢNH CHỜ (`deviceType: DESKTOP` — 16:9 Dark Mode)

#### 7. `SCR-08`: Màn hình TV Hiển thị Công cộng (Public TV Display)
```text
Thiết kế màn hình TV Display toàn màn hình 16:9 (1920x1080) chế độ **Giao diện Sáng (Light Mode)** đồng nhất với toàn hệ thống (nền #F8FAFC, thẻ trắng #FFFFFF viền mảnh #E2E8F0, chữ đen xám #0F172A, điểm nhấn #4F46E5), kèm **nút chuyển đổi Giao diện Sáng / Tối** ngay trên Header để quán tự chọn Dark Mode nếu muốn.
Bố cục thoáng rộng, cỡ chữ nhỏ gọn sắc nét (KHÔNG thô, KHÔNG chật):
- Header gọn: Logo, "Chi nhánh Quận 1", nút chuyển **Sáng / Tối (Sun/Moon)**, công tắc **Giọng đọc TTS (Bật/Tắt)**, chuông Ding Dong, đồng hồ `11:42:35`.
- Bên trái (65%): Bảng "Đang phục vụ" gồm các hàng/thẻ thoáng: Quầy 01 -> số vé **`#A-025` (BẮT BUỘC 1 DÒNG DUY NHẤT `whitespace-nowrap`, tuyệt đối không rớt `#A-` xuống `025`)** -> Nguyễn Văn A; Quầy 02 -> `#B-008` -> Trần Thị Lan; Quầy 03 -> `#A-024`. Thẻ vừa gọi có viền Indigo #4F46E5 nổi bật nhẹ.
- Bên phải trên (35%): Bảng "Vừa gọi gần đây" 4 dòng gọn gàng (`#A-023` - Quầy 01...).
- Bên phải dưới: Khung mã QR sảnh nền trắng sạch sẽ, nhãn gọn "Quét mã lấy số • Cập nhật theo phiên".
```

---

### ĐỢT 4 — QUẢN TRỊ, QR STUDIO & LANDING (`deviceType: DESKTOP` — 1440px)

#### 8. `SCR-01`: Landing Page & Live Interactive Demo
```text
Thiết kế trang Landing Page Desktop (1440px) cho nền tảng SaaS QR Wait (SCR-01), bám sát phong cách tối giản, sáng sủa, hiện đại của https://qrwait.app/vi/, màu chủ đạo Indigo #4F46E5, tiếng Việt.
Bố cục gồm:
- Header: Logo QR Wait, menu chuyển đổi ngôn ngữ (VI / EN), nút "Đăng nhập" và nút CTA nổi bật "Bắt đầu miễn phí".
- Hero Section: Tiêu đề lớn "Hệ thống Xếp hàng Ảo qua Mã QR – Không cần máy in phiếu, không cần cài app", mô tả ngắn gọn không lưu SĐT bảo vệ quyền riêng tư, nút CTA "Dùng thử ngay" và ảnh minh họa phối cảnh điện thoại lấy số + TV sảnh.
- Khối Live Interactive Demo: Cho phép khách xem trước tương tác 2 bên (trái là mô phỏng màn hình điện thoại lấy số, phải là Staff Panel gọi số).
- Feature Grid (6 thẻ tính năng nổi bật): Chống gian lận GPS, Đổi QR theo Ca/Nút bấm, TV Display Ding Dong & Giọng đọc TTS, Thao tác 1 chạm, Không giới hạn lượt vé, Báo cáo & Xuất CSV.
- Footer sạch sẽ có bản quyền, hướng dẫn, liên hệ.
TUYỆT ĐỐI KHÔNG thiết kế phần Bảng giá (Pricing), Gói cước hay Thanh toán.
```

#### 9. `SCR-02`: Màn hình Xác thực & Đăng nhập (Auth & Onboarding)
```text
Thiết kế màn hình Xác thực Desktop (1440px) tối giản (SCR-02) cho hệ thống QR Wait, màu chủ đạo #4F46E5, tiếng Việt.
Bố cục dạng thẻ (Card) căn giữa màn hình trên nền xám nhạt (#F8FAFC):
- Logo QR Wait ở đỉnh thẻ.
- 2 Tab chuyển đổi: "Đăng nhập" và "Đăng ký tổ chức".
- Nút lớn có viền: "Tiếp tục với Google" kèm logo Google chuẩn.
- Đường kẻ phân cách chữ "hoặc sử dụng email".
- Các trường nhập: "Email", "Mật khẩu" (có icon con mắt ẩn/hiện), và khi ở trạng thái Đăng ký có thêm ô "Tên doanh nghiệp / Cửa hàng".
- Liên kết "Quên mật khẩu?" và nút submit toàn chiều rộng màu #4F46E5.
```

#### 10. `SCR-03`: Bảng điều khiển Tổng quan (Executive Dashboard)
```text
Thiết kế màn hình Executive Dashboard Desktop (1440px) cho Chủ doanh nghiệp/Quản lý (SCR-03) của hệ thống QR Wait, phong cách tối giản giống qrwait.app/vi/, màu chủ đạo #4F46E5, tiếng Việt.
Bố cục gồm:
- Sidebar bên trái (có nút thu gọn): Logo QR Wait và menu điều hướng (Tổng quan, Hàng chờ, QR Studio, Báo cáo & CSV, Cài đặt & Đội ngũ).
- Header trên cùng: Dropdown chọn chi nhánh ("Chi nhánh Quận 1"), thông tin tài khoản người dùng.
- 4 thẻ chỉ số KPI (Metric Cards): "Tổng số vé hôm nay (142)", "Đang chờ (18)", "Đang phục vụ (4)", "Tỷ lệ hoàn tất (91%)".
- Biểu đồ cột thời gian thực: Mật độ lưu lượng khách theo từng khung giờ trong ngày hôm nay.
- Bảng "Trạng thái các Hàng chờ": Tên hàng chờ, Prefix, số khách đang chờ, badge trạng thái (OPEN/PAUSED), và nút truy cập nhanh "Mở Staff Panel" / "Mở TV Display".
Không có thông tin gói cước hay hạn mức vé.
```

#### 11. `SCR-04`: Quản lý Hàng chờ & Phiên làm việc (Queue Management)
```text
Thiết kế màn hình Quản lý Hàng chờ Desktop (1440px) (SCR-04) trong khung Sidebar chung của QR Wait, màu chủ đạo #4F46E5, tiếng Việt.
Bố cục gồm:
- Tiêu đề "Quản lý Hàng chờ" và nút "+ Tạo hàng chờ mới" màu #4F46E5 ở góc phải.
- Lưới các thẻ Hàng chờ (Queue Cards):
  - Mỗi thẻ hiển thị: Tên hàng chờ ("Bàn 1–4 người"), Badge Prefix ("[A]"), Số nhóm đang chờ, Thời gian phục vụ TB ("~10 phút/lượt"), Giới hạn nhóm ("1–4 người"), Switch chuyển trạng thái (OPEN xanh lá / PAUSED vàng / CLOSED xám).
  - Menu hành động trên thẻ gồm: "Chỉnh sửa", "Xuất Poster QR", và nút nổi bật **"Bắt đầu phiên mới (Reset số về 001)"** *(CHÚ Ý: Không có chế độ tự động reset 00:00 hàng ngày)*.
- Hiển thị kèm hộp thoại Modal bên phải minh họa form "Tạo/Sửa hàng chờ" (Tên, Prefix, Thời gian TB, Min Party Size, Max Party Size) hoặc Modal xác nhận "Bắt đầu phiên mới & Reset số vé về A-001".
```

#### 12. `SCR-09`: Trung tâm Mã QR & Chống gian lận (QR Studio)
```text
Thiết kế màn hình QR Studio & Chống gian lận Desktop (1440px) (SCR-09) trong khung Sidebar chung của QR Wait, màu chủ đạo #4F46E5, tiếng Việt.
Giao diện chia 3 Tab rõ ràng:
- Tab 1 "Mã QR In ấn (Static Posters)": Bộ chọn hàng chờ, chọn khổ giấy (A4 đứng / A5 / Thẻ mica để bàn), chọn màu nhấn thương hiệu & bật/tắt logo giữa QR; cột bên phải là khung Live Preview Poster khổ A4 hoàn chỉnh có dòng "Quét mã để lấy số thứ tự - Không cần cài app" kèm 2 nút "Tải file PDF (300 DPI)" và "Tải ảnh PNG".
- Tab 2 "Đổi Mã QR & Chiếu Màn hình (Session / Manual QR)": hiển thị mã QR hiện hành đang chiếu trên TV Display, nút "Đổi mã QR mới" (kèm cảnh báo mã cũ trên giấy in/ảnh chụp sẽ mất hiệu lực ngay) và switch tùy chọn "Tự động đổi mã QR khi mở Ca mới" (tắt mặc định).
- Tab 3 "Bảo vệ Vị trí (GPS Geolocation)": Toggle bật/tắt xác thực vị trí, nút "Lấy tọa độ hiện tại", bản đồ nhỏ cắm ghim cửa hàng và thanh trượt chọn bán kính cho phép từ 30m đến 500m (mặc định 100m).
```

#### 13. `SCR-10`: Báo cáo Thống kê & Xuất Dữ liệu (Analytics & Export)
```text
Thiết kế màn hình Báo cáo & Phân tích Desktop (1440px) (SCR-10) trong khung Sidebar chung của QR Wait, màu chủ đạo #4F46E5, tiếng Việt.
Bố cục gồm:
- Thanh bộ lọc trên cùng: Chọn Chi nhánh, Chọn Hàng chờ, Chọn khoảng ngày ("Hôm nay", "7 ngày qua", "30 ngày qua", "Tùy chọn") và nút nổi bật **"Xuất file CSV"** ở góc phải.
- 4 thẻ chỉ số tổng quan: Tổng lượt khách tiếp nhận, Thời gian chờ trung bình (phút), Thời gian phục vụ trung bình (phút), Tỷ lệ vắng mặt No-Show (%).
- Hàng biểu đồ chia 2 cột: Bên trái là Biểu đồ cột lưu lượng khách theo khung giờ (nhận diện giờ cao điểm); bên phải là Biểu đồ tròn (Donut Chart) tỷ lệ trạng thái vé (Hoàn tất / Tự hủy / Vắng mặt).
- Bảng phía dưới: "Năng suất phục vụ theo Nhân viên" gồm cột Tên nhân viên, Số lượt đã phục vụ, Thời gian xử lý trung bình.
```

#### 14. `SCR-11`: Cài đặt Hệ thống & Quản lý Đội ngũ (Settings & Team)
```text
Thiết kế màn hình Cài đặt & Đội ngũ Desktop (1440px) (SCR-11) trong khung Sidebar chung của QR Wait, màu chủ đạo #4F46E5, tiếng Việt.
Giao diện chia 2 Tab (KHÔNG có badge gói Pro/Billing và KHÔNG có Tab API Keys/Webhooks):
- Tab 1 "Thành viên & Phân quyền": Bảng danh sách nhân sự (Tên hiển thị, Email, Vai trò Owner/Manager/Staff, Chi nhánh được gán, Trạng thái hoạt động, nút Khóa/Mở khóa) và nút "+ Thêm thành viên" mở modal nhập trực tiếp Tên, Email, Mật khẩu ban đầu, Vai trò và Chi nhánh (tạo xong đăng nhập ngay, không cần gửi mail kích hoạt).
- Tab 2 "Chi nhánh, TV Display & Âm thanh (TTS)": Thông tin hồ sơ tổ chức (Logo, Múi giờ), danh sách chi nhánh kèm hộp tạo Secret URL cho TV Display (`https://app.qrwait.com/display/sec_...`) có nút "Sao chép liên kết" và "Tạo lại mã", kèm công tắc **Bật/Tắt giọng đọc Text-to-Speech (TTS)** mặc định trên TV Display (chuông Ding Dong luôn bật).
```
