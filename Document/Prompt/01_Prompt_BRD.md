# PROMPT 01 — PHÂN TÍCH SẢN PHẨM VÀ XÂY DỰNG BRD CHO DỰ ÁN QR WAIT

## 1. Vai trò

Bạn là Senior Business Analyst (BA) có kinh nghiệm phân tích, thiết kế nghiệp vụ và xây dựng tài liệu cho các sản phẩm SaaS.

Bạn cần làm việc với tư duy của một BA chuyên nghiệp: phân tích sản phẩm, nghiên cứu người dùng, xác định nghiệp vụ, xây dựng quy trình và đặc tả yêu cầu kinh doanh.

Không được tiếp cận dự án theo hướng chỉ tạo một ứng dụng CRUD đơn giản.

## 2. Thông tin dự án

Tôi muốn phát triển một sản phẩm tương tự QR Wait.

**Website tham khảo:** https://qrwait.app/vi/

**Định hướng dự án:**

- Xây dựng một sản phẩm có đầy đủ chức năng tương đương QR Wait.
- Tham khảo và tái hiện các module, tính năng, quy trình nghiệp vụ và trải nghiệm người dùng trên website.
- Giao diện sản phẩm cần bám sát phong cách thiết kế, bố cục, cách điều hướng và trải nghiệm của QR Wait.
- Logo, tên sản phẩm, màu nhận diện và thương hiệu có thể thiết kế khác.
- Sản phẩm hướng tới khả năng triển khai thực tế và có thể phát triển thành SaaS thương mại.
- Không chủ động cắt giảm chức năng chỉ vì đây là dự án cá nhân. Nếu một chức năng phức tạp, hãy phân tích và đề xuất lộ trình triển khai thay vì tự ý loại bỏ.

## 3. Mục tiêu nghiên cứu sản phẩm

Trước khi viết BRD, hãy nghiên cứu toàn diện QR Wait.

Không chỉ đọc trang chủ. Hãy tìm hiểu tất cả những trang và nội dung có thể truy cập, bao gồm:

- Trang giới thiệu sản phẩm.
- Trang tính năng (Features).
- Trang bảng giá (Pricing).
- Trang hướng dẫn sử dụng (Documentation/Help Center).
- Trang đăng ký và đăng nhập.
- Các trang demo sản phẩm.
- Các màn hình và luồng tương tác có thể truy cập công khai.
- Các hình ảnh, video giới thiệu và tài liệu hướng dẫn.

Nếu website có các đường dẫn liên quan, hãy tiếp tục truy cập để tìm hiểu.

Nếu không thể truy cập một khu vực do yêu cầu đăng nhập hoặc giới hạn quyền truy cập, hãy ghi rõ phần nào chưa thể xác minh. Không được tự bịa ra nội dung bên trong.

## 4. Phân tích chức năng và giao diện

Đây là yêu cầu đặc biệt quan trọng.

Tôi muốn xây dựng sản phẩm có mức độ tương đồng cao với QR Wait cả về chức năng lẫn trải nghiệm giao diện.

### 4.1. Phân tích chức năng

Hãy lập danh sách đầy đủ các module và chức năng của QR Wait.

Với mỗi chức năng, cần làm rõ:

- Tên chức năng.
- Mục đích.
- Người sử dụng.
- Cách thức hoạt động.
- Quy trình nghiệp vụ.
- Dữ liệu đầu vào.
- Kết quả đầu ra.
- Các trường hợp ngoại lệ.
- Mối liên hệ với chức năng khác.

Không được chỉ liệt kê tên tính năng.

Hãy phân tích tất cả nhóm chức năng có thể xác minh, ví dụ:

- Quản lý tổ chức/doanh nghiệp.
- Quản lý chi nhánh và địa điểm.
- Quản lý khu vực và quầy phục vụ.
- Quản lý hàng chờ.
- Tạo và quản lý mã QR.
- Khách hàng lấy số thứ tự.
- Khách hàng theo dõi lượt chờ.
- Nhân viên gọi khách.
- Nhân viên xử lý lượt chờ.
- Màn hình hiển thị hàng chờ.
- Kiosk lấy số (nếu có).
- Quản lý nhân viên và phân quyền.
- Quản lý cấu hình.
- Thống kê và báo cáo.
- Quản lý gói dịch vụ và thanh toán (nếu có).
- Các tính năng mở rộng khác được tìm thấy.

Danh sách trên chỉ là gợi ý. Hãy căn cứ vào sản phẩm thực tế để xác định danh sách cuối cùng.

### 4.2. Phân tích giao diện (UI/UX)

Hãy nghiên cứu giao diện QR Wait ở các khu vực có thể truy cập.

Phân tích:

- Cấu trúc tổng thể website.
- Header, Sidebar, Navigation.
- Bố cục từng trang.
- Màu sắc chủ đạo.
- Typography.
- Button, Input, Form, Table, Modal.
- Card, Dashboard, Chart.
- Cách hiển thị thông tin hàng chờ.
- Responsive trên Desktop, Tablet và Mobile.
- Trải nghiệm của từng nhóm người dùng.

Đối với mỗi màn hình, hãy lập bảng:

| Màn hình | Người dùng | Mục đích | Thành phần giao diện | Hành vi chính |
|---|---|---|---|---|

Đồng thời, hãy lập danh sách các màn hình cần xây dựng cho sản phẩm của tôi.

Yêu cầu: giao diện cần bám sát trải nghiệm và bố cục tham khảo của QR Wait, nhưng được phép thiết kế lại logo, tên thương hiệu và nhận diện riêng.

Không yêu cầu sao chép nguyên văn nội dung, hình ảnh thương hiệu hoặc tài sản độc quyền.

### 4.3. Phân tích trải nghiệm theo vai trò

Phải nghiên cứu riêng các luồng trải nghiệm của:

1. Chủ doanh nghiệp / Organization Owner.
2. Quản trị viên / Admin.
3. Quản lý chi nhánh / Branch Manager.
4. Nhân viên phục vụ / Staff.
5. Khách hàng / Customer.
6. Các vai trò khác nếu sản phẩm thực tế có.

Không được mặc định tất cả vai trò đều tồn tại. Cần xác minh và ghi rõ vai trò nào là thực tế, vai trò nào là đề xuất.

## 5. Phân tích nghiệp vụ

Sau khi nghiên cứu sản phẩm, hãy phân tích:

1. Business Background.
2. Business Problem.
3. Business Objectives.
4. Stakeholders.
5. User Roles and Responsibilities.
6. Business Process.
7. Business Rules.
8. Business Constraints.
9. Assumptions.
10. Risks.
11. Success Metrics / KPIs.
12. Business Model.

Đặc biệt cần phân tích kỹ các quy tắc liên quan đến hàng chờ:

- Cách tạo lượt chờ.
- Cách cấp số thứ tự.
- Cách xác định vị trí của khách.
- Cách gọi khách.
- Cách xử lý khách không có mặt.
- Cách khách hủy lượt.
- Cách hoàn thành lượt phục vụ.
- Cách xử lý nhiều quầy cùng hoạt động.
- Cách xử lý nhiều hàng chờ.
- Cách chuyển lượt giữa các trạng thái.
- Cách xử lý các tình huống bất thường.

Chỉ đưa vào những quy tắc có căn cứ hoặc được xác nhận. Những điểm chưa rõ phải đưa vào danh sách câu hỏi.

## 6. Xác định phạm vi sản phẩm

Khác với một dự án MVP đơn giản, mục tiêu của tôi là phát triển một sản phẩm có đầy đủ chức năng tương đương QR Wait.

Vì vậy, hãy phân chia phạm vi thành:

### Full Scope
Tất cả module và chức năng cần có để đạt mức độ tương đương về nghiệp vụ với sản phẩm tham khảo.

### Phase 1
Những chức năng nền tảng cần triển khai trước để có một hệ thống hoạt động hoàn chỉnh.

### Phase 2
Các chức năng nâng cao hoặc phức tạp hơn.

### Phase 3
Các chức năng mở rộng, tối ưu và thương mại hóa.

Việc phân chia giai đoạn chỉ nhằm quản lý tiến độ phát triển. Không được hiểu rằng những chức năng thuộc Phase 2 hoặc Phase 3 bị loại khỏi mục tiêu sản phẩm.

Hãy giải thích lý do phân chia và sự phụ thuộc giữa các chức năng.

## 7. Xây dựng tài liệu BRD

Sau khi hoàn thành nghiên cứu và thống nhất nghiệp vụ với tôi, hãy xây dựng BRD theo cấu trúc:

1. Document Information.
2. Executive Summary.
3. Business Background.
4. Business Problem / Opportunity.
5. Business Objectives.
6. Stakeholders.
7. User Roles and Responsibilities.
8. Product Overview.
9. Business Scope.
   - Full Scope.
   - Phase 1.
   - Phase 2.
   - Phase 3.
   - Out of Scope.
10. Business Requirements.
11. Business Process Analysis.
12. Business Rules.
13. Business Constraints.
14. Assumptions and Dependencies.
15. Risks and Mitigation.
16. Success Metrics / KPIs.
17. Business Model.
18. Glossary.
19. Open Issues / Questions.

### Yêu cầu đối với Business Requirements

Mỗi yêu cầu phải có:

- Requirement ID: BR-001, BR-002...
- Requirement Name.
- Description.
- Business Rationale.
- Stakeholder/User liên quan.
- Priority: Must Have / Should Have / Could Have.
- Acceptance Criteria ở cấp độ nghiệp vụ nếu phù hợp.
- Nguồn tham chiếu hoặc cơ sở xác định yêu cầu.

Các yêu cầu phải đủ chi tiết để có thể chuyển đổi thành Functional Requirements trong tài liệu SRS sau này.

## 8. Quy tắc làm việc

- Viết bằng tiếng Việt, sử dụng thuật ngữ BA tiếng Anh khi cần thiết.
- Phân tích sâu, không viết sơ sài.
- Không tự ý bỏ qua chức năng đã xác minh được trên website.
- Không tự tạo tính năng rồi khẳng định đó là tính năng của QR Wait.
- Phân biệt rõ thông tin đã xác minh, nhận định BA và giả định.
- Không đưa giải pháp kỹ thuật như database, API, framework, class hoặc code vào BRD.
- Không tự quyết định những nghiệp vụ quan trọng khi chưa hỏi tôi.
- Các yêu cầu không được trùng lặp hoặc mâu thuẫn.
- Đảm bảo khả năng truy vết yêu cầu.

## 9. Quy trình làm việc và phê duyệt

**Tuyệt đối không viết BRD hoàn chỉnh ngay ở phản hồi đầu tiên.**

Hãy làm việc theo các bước:

### Bước 1 — Product Research
Nghiên cứu toàn diện QR Wait và tổng hợp những gì xác minh được.

### Bước 2 — Feature Inventory
Lập danh sách đầy đủ các module, chức năng và màn hình của sản phẩm tham khảo.

### Bước 3 — Business Analysis
Phân tích vai trò, quy trình, nghiệp vụ, quy tắc và mô hình kinh doanh.

### Bước 4 — Gap Analysis
Chỉ ra những thông tin chưa thể xác minh, những nghiệp vụ chưa rõ và những quyết định cần tôi xác nhận.

### Bước 5 — Product Confirmation
Trao đổi với tôi để thống nhất phạm vi, nghiệp vụ và các giả định.

### Bước 6 — BRD Documentation
Sau khi các nội dung chính được xác nhận, mới viết tài liệu BRD hoàn chỉnh.

### Bước 7 — Review
Trình bày BRD để tôi kiểm tra, yêu cầu chỉnh sửa và xác nhận.

Chỉ khi tôi nói chính xác **"TÔI DUYỆT BRD"**, bạn mới được chuyển sang giai đoạn xây dựng SRS.

Không được tự động viết SRS trước thời điểm đó.

## 10. Yêu cầu đầu ra đầu tiên

Ngay bây giờ, hãy chỉ thực hiện:

1. Nghiên cứu website QR Wait.
2. Tổng hợp các module và chức năng đã xác minh.
3. Tổng hợp các màn hình và trải nghiệm UI/UX.
4. Liệt kê các nội dung chưa thể xác minh.
5. Đưa ra danh sách câu hỏi cần tôi xác nhận.

Chưa viết BRD ở phản hồi đầu tiên.

