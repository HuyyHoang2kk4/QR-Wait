# BỘ PROMPT THIẾT KẾ GIAO DIỆN STITCH — DỰ ÁN QR WAIT

> **Căn cứ:** `BRD_QR_Wait.md` v1.3, `SRS_QR_Wait.md` v1.2 (Mục 7: UI/UX Requirements) và Website tham chiếu `https://qrwait.app/vi/`.  
> **Cách dùng với Stitch MCP:** Nạp **Phần 1 (Design System)** trước để khóa nhận diện chung, sau đó sinh lần lượt từng màn hình ở **Phần 2** theo đúng `deviceType` (`MOBILE` / `TABLET` / `DESKTOP`) để đảm bảo đủ chi tiết và không bỏ sót trạng thái nghiệp vụ.

---

## PHẦN 1: QUY CHUẨN DESIGN SYSTEM CHUNG (DESIGN.md / THEME)

* **Phong cách thị giác:** Tối giản (Minimalist), hiện đại, tập trung tác vụ (Task-oriented), độ tương phản cao theo đúng phong cách của `https://qrwait.app/vi/`.
* **Bảng màu chuẩn:**
  * Màu chủ đạo (Primary Accent): Indigo Blue `#4F46E5`
  * Màu trạng thái Sẵn sàng / Tới lượt (`CALLED` / `COMPLETED`): Xanh lá `#10B981`
  * Màu trạng thái Đang chờ / Cảnh báo (`WAITING` / `NO_SHOW`): Vàng hổ phách `#F59E0B`
  * Màu trạng thái Đang phục vụ (`SERVING`): Xanh dương `#3B82F6`
  * Màu lỗi / Hủy (`ERROR` / `CANCELLED`): Đỏ `#EF4444`
* **Typography:** Font `Inter` hoặc `Be Vietnam Pro` hỗ trợ hoàn chỉnh tiếng Việt có dấu; các số thứ tự vé (`#A-025`) sử dụng cỡ chữ Display Bold cực lớn để đọc rõ từ xa.
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
Thiết kế màn hình Mobile Web PWA (375px) cho khách hàng lấy số thứ tự tự phục vụ (SCR-06) của hệ thống QR Wait, phong cách tối giản giống qrwait.app/vi/, màu chủ đạo Indigo #4F46E5, tiếng Việt hoàn toàn.
Bố cục dọc từ trên xuống gồm:
- Header căn giữa: Logo cửa hàng sắc nét, tên chi nhánh ("Chi nhánh Quận 1") và tên hàng chờ ("Hàng chờ Bàn 1–4 người").
- Hộp thông tin nhẹ nền xanh nhạt: "Hiện có 3 nhóm đang chờ phía trước".
- Ô nhập "Tên của bạn *" (có dấu sao đỏ bắt buộc, placeholder: "Nhập tên để nhân viên gọi số (ví dụ: Anh Nam)").
- Ô nhập "Ghi chú (Không bắt buộc)" (placeholder: "Ghi chú thêm (ví dụ: Có ghế trẻ em)").
- Bộ chọn "Số lượng người (Party Size)" dạng các nút bo tròn bấm nhanh: 1, 2, 3, 4, 5+ (mặc định chọn 2).
- Nút CTA cực lớn toàn chiều rộng màu #4F46E5: "LẤY SỐ NGAY".
- Dòng cam kết bảo mật nhỏ ở chân trang: "Không cần cài đặt ứng dụng. Chúng tôi không lưu số điện thoại của bạn."
Tuyệt đối không có ô nhập số điện thoại hay email.
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
Thiết kế màn hình Bảng điều khiển Nhân viên thao tác 1 chạm (SCR-05 - Staff Panel) tối ưu cảm ứng (nút bấm >= 52px) cho Tablet/Mobile của hệ thống QR Wait, phong cách tối giản giống qrwait.app/vi/, màu chủ đạo #4F46E5, tiếng Việt.
Bố cục gồm:
- Header: Tên hàng chờ ("Bàn 1–4 người"), Dropdown chọn quầy đang trực ("Quầy 01"), và nút "+ Thêm khách (Walk-in)" ở góc phải.
- Khu vực trung tâm (Thẻ khách đang xử lý):
  - Số vé cực lớn "#A-025", Tên khách "Nguyễn Văn A", Quy mô "Nhóm 4 người", Ghi chú "Có ghế trẻ em".
  - **Đồng hồ đếm thời gian chờ khách (2 phút):** Hiển thị rõ ràng bộ đếm `01:42 / 02:00` (chỉ báo trực quan giúp nhân viên dễ theo dõi, **không khóa nút thao tác** — nhân viên có thể bấm Vắng mặt / Gọi tiếp bất cứ lúc nào).
  - Huy hiệu phát sáng màu xanh lá (#10B981): "Khách báo đã tới / đang tới" (khi khách đã bấm trên điện thoại).
  - Hàng nút bấm cảm ứng cỡ lớn: "BẮT ĐẦU PHỤC VỤ" (xanh dương #3B82F6), "GỌI LẠI (1/3 • 12s)" (vàng #F59E0B), "VẮNG MẶT" (đỏ nhạt #EF4444), "HOÀN TẤT" (xanh lá #10B981), và nút icon "Chuyển vé" (mở modal chuyển Quầy hoặc chuyển Hàng chờ).
- Thanh tab chuyển đổi ở phần dưới: Tab "Đang chờ (12)" hiển thị danh sách khách xếp hàng FIFO (vé Walk-in có icon người đi bộ) và Tab "Vắng mặt 15p (2)" hiển thị các vé No-Show kèm đồng hồ đếm ngược ("Còn 08:45") và nút "Phục hồi vé".
- Nút cố định cực lớn chiếm trọn đáy màn hình màu Indigo #4F46E5: "GỌI TIẾP THEO".
```

---

### ĐỢT 3 — MÀN HÌNH SẢNH CHỜ (`deviceType: DESKTOP` — 16:9 Dark Mode)

#### 7. `SCR-08`: Màn hình TV Hiển thị Công cộng (Public TV Display)
```text
Thiết kế màn hình TV Display toàn màn hình 16:9 (1920x1080) chế độ Dark Mode tương phản cao (nền xanh đen đậm #0F172A, chữ trắng và vàng kim #FBBF24) nhìn rõ từ khoảng cách 10-15m cho sảnh chờ (SCR-08) của hệ thống QR Wait, tiếng Việt.
Bố cục gồm:
- Header: Logo doanh nghiệp, Tên chi nhánh ("Chi nhánh Quận 1"), đồng hồ kỹ thuật số thời gian thực ở góc phải, trạng thái chuông "Ding Dong" và **công tắc Bật/Tắt giọng đọc TTS** (cùng nút nhỏ "Chạm để kích hoạt âm thanh & giọng đọc").
- Khu vực bên trái (65% chiều rộng): Tiêu đề lớn "ĐANG PHỤC VỤ" với các ô thẻ to bản cho từng quầy:
  - Thẻ 1 (đang chớp sáng viền vàng/xanh nổi bật vì vừa gọi): "Quầy 01" -> Số vé cực lớn "#A-025" (Nguyễn Văn A).
  - Thẻ 2: "Quầy 02" -> "#B-008".
  - Thẻ 3: "Quầy 03" -> "#A-024".
- Khu vực bên phải trên (35% chiều rộng): Bảng "VỪA GỌI GẦN ĐÂY" liệt kê 4 số vé vừa gọi trước đó kèm tên quầy.
- Khu vực bên phải dưới: Hộp nền trắng nổi bật chứa mã QR sảnh sắc nét, nhãn "Mã QR hiện hành (Cập nhật theo phiên / khi đổi mã)" và dòng chữ "Quét mã lấy số thứ tự tại sảnh".
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
