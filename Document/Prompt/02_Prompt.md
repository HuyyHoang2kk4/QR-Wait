# PROMPT 02 — XÂY DỰNG TÀI LIỆU SRS CHUYÊN NGHIỆP CHO QR QUEUE MANAGEMENT SYSTEM

## 1. Vai trò

Bạn hãy đóng vai **Senior Business Analyst (BA) kiêm System Analyst (SA)** có kinh nghiệm xây dựng tài liệu Software Requirements Specification (SRS) cho các sản phẩm SaaS thực tế.

Bạn có kinh nghiệm:
- Phân tích và đặc tả hệ thống phần mềm.
- Chuyển đổi Business Requirements thành Functional Requirements.
- Xây dựng Use Case Specification.
- Phân tích quy trình nghiệp vụ và State Transition.
- Đặc tả UI/UX Requirements.
- Xây dựng Acceptance Criteria.
- Kiểm soát Requirement Traceability.
- Viết tài liệu theo tinh thần IEEE 29148.

Nhiệm vụ của bạn là xây dựng một bộ tài liệu SRS chuyên nghiệp, có thể sử dụng trực tiếp làm cơ sở cho Developer, Designer và Tester.

## 2. Bối cảnh dự án

Tôi đang phát triển dự án **QR Queue Management System**.

Website tham khảo: https://qrwait.app/vi/

Định hướng sản phẩm:

- Xây dựng hệ thống có đầy đủ chức năng tương đương QR Wait.
- Tham khảo quy trình nghiệp vụ, chức năng, cấu trúc màn hình và trải nghiệm người dùng của QR Wait.
- Giao diện sản phẩm cần bám sát phong cách, bố cục, cách điều hướng và trải nghiệm của website tham khảo.
- Logo, tên thương hiệu và bộ nhận diện có thể được thiết kế mới.
- Hướng tới một sản phẩm SaaS có khả năng triển khai thực tế và thương mại hóa.
- Sản phẩm được phát triển theo nhiều giai đoạn, nhưng SRS phải bao quát toàn bộ phạm vi đã thống nhất trong BRD.

## 3. Tài liệu đầu vào

Tôi sẽ cung cấp BRD đã được phê duyệt.

Đây là nguồn yêu cầu nghiệp vụ chính thức và là căn cứ quan trọng nhất để xây dựng SRS.

Bạn phải:

1. Đọc và phân tích toàn bộ BRD.
2. Nắm rõ phạm vi sản phẩm, các module, vai trò và quy trình nghiệp vụ.
3. Đối chiếu với danh sách chức năng và màn hình đã thống nhất từ giai đoạn phân tích QR Wait.
4. Chuyển đổi Business Requirements thành System Requirements.
5. Phát hiện các yêu cầu thiếu, mâu thuẫn hoặc chưa rõ.
6. Không tự ý thay đổi nội dung BRD đã duyệt.

Nếu phát hiện điểm chưa rõ, hãy lập danh sách câu hỏi để tôi xác nhận trước khi đặc tả.

## 4. Nguyên tắc xây dựng SRS

Tài liệu cần đáp ứng các nguyên tắc:

- Mỗi yêu cầu phải rõ ràng, đơn nghĩa và có thể kiểm thử.
- Không viết chung chung hoặc sử dụng những từ không đo lường được như "nhanh", "tốt", "thân thiện" nếu không có tiêu chí cụ thể.
- Mỗi Functional Requirement phải mô tả một hành vi hoặc năng lực cụ thể của hệ thống.
- Không trùng lặp hoặc mâu thuẫn giữa các yêu cầu.
- Mỗi yêu cầu phải có ID duy nhất.
- Các yêu cầu phải có khả năng truy vết về BRD.
- Phân biệt rõ Functional Requirements và Non-functional Requirements.
- Phân biệt Business Rules và System Behavior.
- Không tự ý thêm chức năng không có trong BRD.
- Những yêu cầu cần bổ sung phải được đánh dấu là Proposed Requirement và chờ tôi phê duyệt.
- Không tự suy diễn các quy tắc nghiệp vụ chưa được xác nhận.

## 5. Cấu trúc tài liệu SRS

### 1. Introduction

- 1.1 Purpose
- 1.2 Scope
- 1.3 Intended Audience
- 1.4 Product Overview
- 1.5 Definitions, Acronyms and Abbreviations
- 1.6 References

### 2. Overall Description

- 2.1 Product Perspective
- 2.2 Product Functions
- 2.3 User Classes and Characteristics
- 2.4 Operating Environment
- 2.5 Design and Implementation Constraints
- 2.6 Assumptions and Dependencies

### 3. System Actors and Permissions

Mô tả chi tiết từng Actor:

- Actor ID.
- Actor Name.
- Description.
- Responsibilities.
- Permissions.
- Limitations.

Xây dựng bảng phân quyền theo chức năng (Role Permission Matrix).

Phải làm rõ quyền của từng vai trò đối với từng module.

Không mặc định một vai trò có toàn quyền nếu BRD không quy định.

### 4. Functional Requirements

Đây là phần quan trọng nhất của SRS.

Phân chia Functional Requirements theo từng module nghiệp vụ đã thống nhất trong BRD.

Ví dụ các nhóm module có thể gồm:

- Authentication & Authorization.
- Organization Management.
- Branch Management.
- Queue Management.
- Queue Configuration.
- QR Code Management.
- Customer Queue Experience.
- Staff Management.
- Counter Management.
- Calling and Serving Customers.
- Display Screen.
- Kiosk Management.
- Notification Management.
- Dashboard and Analytics.
- Subscription and Billing.
- System Configuration.

Danh sách trên là gợi ý. Cần căn cứ vào BRD để xây dựng cấu trúc cuối cùng.

#### Mỗi Functional Requirement phải có cấu trúc:

**Requirement ID:** FR-XXX

**Requirement Name:** Tên chức năng.

**Description:** Mô tả chức năng.

**Actor:** Người thực hiện.

**Priority:** Must Have / Should Have / Could Have.

**Preconditions:** Điều kiện trước khi thực hiện.

**Trigger:** Sự kiện kích hoạt.

**Main Flow:** Luồng xử lý chính theo từng bước.

**Alternative Flow:** Các luồng thay thế.

**Exception Flow:** Các tình huống lỗi hoặc ngoại lệ.

**Business Rules:** Quy tắc nghiệp vụ liên quan.

**Input:** Dữ liệu đầu vào.

**Output:** Kết quả đầu ra.

**Postconditions:** Trạng thái sau khi thực hiện.

**Acceptance Criteria:** Tiêu chí nghiệm thu.

Không gộp nhiều chức năng độc lập vào một Functional Requirement quá lớn.

### 5. Detailed Business Workflow

Đặc tả chi tiết các quy trình nghiệp vụ quan trọng.

Đặc biệt cần làm rõ:

1. Quy trình đăng ký và đăng nhập.
2. Quy trình tạo tổ chức và thiết lập chi nhánh.
3. Quy trình cấu hình khu vực, quầy và hàng chờ.
4. Quy trình tạo và sử dụng mã QR.
5. Quy trình khách hàng quét QR và lấy số.
6. Quy trình khách hàng theo dõi vị trí hàng chờ.
7. Quy trình nhân viên gọi khách.
8. Quy trình tiếp nhận và phục vụ khách.
9. Quy trình khách hàng không có mặt.
10. Quy trình hủy lượt chờ.
11. Quy trình hoàn thành lượt phục vụ.
12. Quy trình xử lý nhiều quầy và nhiều hàng chờ.
13. Quy trình hiển thị thông tin trên màn hình công cộng.
14. Quy trình gửi thông báo.
15. Các quy trình khác được xác định trong BRD.

Với mỗi quy trình cần mô tả:
- Actor tham gia.
- Điều kiện bắt đầu.
- Các bước thực hiện.
- Kết quả.
- Các nhánh xử lý.
- Các tình huống ngoại lệ.

Sử dụng Mermaid Flowchart hoặc Sequence Diagram khi phù hợp.

### 6. Use Case Specification

Xây dựng Use Case Diagram tổng quan và đặc tả từng Use Case.

Mỗi Use Case cần có:

- Use Case ID.
- Use Case Name.
- Description.
- Primary Actor.
- Secondary Actor.
- Preconditions.
- Trigger.
- Main Success Scenario.
- Alternative Flows.
- Exception Flows.
- Postconditions.
- Related Requirements.

Sử dụng Mermaid để mô tả sơ đồ khi phù hợp.

### 7. UI/UX Requirements

Đây là phần quan trọng vì sản phẩm cần có trải nghiệm tương tự QR Wait.

Dựa trên danh sách màn hình và phân tích giao diện đã thống nhất trong giai đoạn BRD, hãy đặc tả yêu cầu giao diện.

Với mỗi màn hình, cần có:

- Screen ID.
- Screen Name.
- User Role.
- Purpose.
- Layout Description.
- UI Components.
- Data Display.
- User Actions.
- Validation Rules.
- Navigation.
- Empty State.
- Loading State.
- Error State.
- Responsive Requirements.

Cần đặc tả các trạng thái giao diện quan trọng.

Ví dụ:
- Dashboard.
- Danh sách hàng chờ.
- Chi tiết hàng chờ.
- Cấu hình hàng chờ.
- Màn hình lấy số của khách hàng.
- Màn hình theo dõi lượt chờ.
- Màn hình nhân viên gọi khách.
- Màn hình hiển thị số thứ tự.
- Các màn hình quản trị khác.

Lưu ý:
- Bám sát bố cục và trải nghiệm QR Wait.
- Không sao chép logo hoặc nhận diện thương hiệu.
- Mô tả rõ các thành phần và hành vi để Designer/Frontend Developer có thể triển khai.
- Không tự thiết kế thêm màn hình không nằm trong phạm vi đã thống nhất.

### 8. External Interface Requirements

#### 8.1 User Interface
Các yêu cầu giao diện người dùng.

#### 8.2 Software Interface
Các yêu cầu tích hợp với hệ thống bên ngoài nếu có.

#### 8.3 Communication Interface
Các yêu cầu giao tiếp giữa các thành phần và thiết bị.

### 9. Data Requirements

Mô tả dữ liệu nghiệp vụ cần quản lý:

- Entity Name.
- Description.
- Attributes.
- Data Type ở mức yêu cầu.
- Required / Optional.
- Validation Rules.
- Relationships ở mức nghiệp vụ.
- Data Constraints.

Chưa cần thiết kế Database vật lý hoặc viết SQL.

Tuy nhiên, phải xác định đầy đủ các nhóm dữ liệu cần thiết để phục vụ việc thiết kế Database ở giai đoạn sau.

### 10. Business Rules

Tổng hợp các Business Rules từ BRD.

Mỗi quy tắc cần có:

- Rule ID: BRL-XXX.
- Rule Name.
- Description.
- Related Functional Requirements.
- Conditions.
- Expected Behavior.

Đặc biệt chú ý các quy tắc liên quan đến vòng đời của lượt chờ.

### 11. State Transition Specification

Đối với những đối tượng có trạng thái, hãy mô tả:

- Các trạng thái hợp lệ.
- Ý nghĩa từng trạng thái.
- Điều kiện chuyển trạng thái.
- Actor có quyền chuyển trạng thái.
- Hành động được phép.
- Các trạng thái không thể chuyển trực tiếp.

Đặc biệt cần mô tả vòng đời Queue Ticket.

Sử dụng Mermaid State Diagram.

Không tự ý đặt trạng thái nếu chưa được xác nhận trong nghiệp vụ.

### 12. Non-functional Requirements

Đặc tả các nhóm yêu cầu phi chức năng:

- Performance.
- Security.
- Availability.
- Reliability.
- Scalability.
- Usability.
- Maintainability.
- Compatibility.
- Data Privacy.
- Accessibility.
- Backup and Recovery.

Mỗi yêu cầu phải có:
- NFR ID.
- Requirement Name.
- Description.
- Measurement Criteria.
- Priority.
- Verification Method.

Ví dụ, không viết "Hệ thống phải phản hồi nhanh".

Hãy viết theo hướng có thể kiểm thử, chẳng hạn thời gian phản hồi mục tiêu trong điều kiện tải xác định.

Nếu chưa có số liệu thực tế, hãy đề xuất ngưỡng hợp lý và đánh dấu Proposed để tôi xác nhận.

### 13. Error Handling and Validation

Mô tả:

- Quy tắc kiểm tra dữ liệu.
- Thông báo lỗi.
- Các tình huống hệ thống không xử lý được yêu cầu.
- Các tình huống mất kết nối.
- Các trường hợp người dùng không đủ quyền.
- Các trường hợp dữ liệu không hợp lệ.
- Cách hệ thống phản hồi khi xảy ra lỗi.

### 14. Requirement Traceability Matrix (RTM)

Xây dựng bảng truy vết:

| BR ID | FR ID | UC ID | Screen ID | AC ID |
|---|---|---|---|---|

Đảm bảo:
- Tất cả Business Requirements trong BRD đều được xem xét.
- Các Functional Requirements có nguồn gốc rõ ràng.
- Không bỏ sót yêu cầu.
- Phát hiện những yêu cầu không có căn cứ từ BRD.
- Có thể truy ngược từ yêu cầu chức năng về yêu cầu kinh doanh.

### 15. Acceptance Criteria

Tổng hợp các tiêu chí nghiệm thu quan trọng.

Ưu tiên viết theo định dạng Given - When - Then khi phù hợp.

Ví dụ:

- Given: Khách hàng đã tham gia hàng chờ.
- When: Nhân viên gọi lượt tiếp theo.
- Then: Hệ thống cập nhật lượt được gọi và thông tin hàng chờ của khách hàng.

Ví dụ chỉ mang tính minh họa. Tiêu chí chính thức phải căn cứ vào nghiệp vụ đã xác nhận.

### 16. Open Issues

Liệt kê:
- Những yêu cầu chưa rõ.
- Những quy tắc chưa thống nhất.
- Những thông tin cần xác nhận.
- Những yêu cầu đang chờ phê duyệt.
- Những điểm phụ thuộc vào hệ thống bên ngoài.

## 6. Quy tắc đặt mã định danh

Sử dụng hệ thống ID nhất quán:

- BR-XXX: Business Requirement.
- FR-XXX: Functional Requirement.
- NFR-XXX: Non-functional Requirement.
- UC-XXX: Use Case.
- BRL-XXX: Business Rule.
- SCR-XXX: Screen Requirement.
- AC-XXX: Acceptance Criteria.
- NFR-XXX: Non-functional Requirement.

Không sử dụng trùng ID.

Không tự ý thay đổi ID đã được sử dụng khi chỉnh sửa tài liệu, trừ khi có lý do rõ ràng.

## 7. Quản lý phạm vi và phiên bản

SRS phải bao quát toàn bộ phạm vi sản phẩm đã duyệt trong BRD.

Phân loại yêu cầu theo giai đoạn:

- Phase 1.
- Phase 2.
- Phase 3.

Không được bỏ qua yêu cầu thuộc giai đoạn sau.

Mỗi yêu cầu cần ghi rõ giai đoạn triển khai dự kiến để thuận tiện quản lý tiến độ.

Nếu có thay đổi so với BRD, phải ghi nhận trong Change Log và yêu cầu tôi phê duyệt.

## 8. Quy trình thực hiện

Không viết toàn bộ SRS ngay lập tức.

Thực hiện theo thứ tự:

### Bước 1: Review BRD
Đọc toàn bộ BRD đã duyệt.

Kiểm tra:
- Tính đầy đủ.
- Tính nhất quán.
- Phạm vi.
- Stakeholders.
- Business Requirements.
- Business Rules.

### Bước 2: Xây dựng SRS Outline
Đề xuất cấu trúc tài liệu SRS và danh sách module cần đặc tả.

### Bước 3: Requirement Analysis
Chuyển đổi Business Requirements thành danh sách Functional Requirements và Non-functional Requirements.

Xác định các điểm còn thiếu hoặc mâu thuẫn.

### Bước 4: Xác nhận với tôi
Hỏi các câu hỏi cần thiết trước khi đặc tả chi tiết.

Không tự đưa ra quyết định nghiệp vụ quan trọng.

### Bước 5: Viết SRS
Viết lần lượt theo từng module.

Sau mỗi module, cho tôi review và chỉnh sửa trước khi tiếp tục.

### Bước 6: Kiểm tra tổng thể
Kiểm tra:
- ID.
- Tính nhất quán.
- Luồng nghiệp vụ.
- Quy tắc nghiệp vụ.
- Acceptance Criteria.
- RTM.
- Phạm vi so với BRD.

### Bước 7: Hoàn thiện tài liệu
Tạo bộ tài liệu Markdown hoàn chỉnh.

## 9. Định dạng đầu ra

Sử dụng Markdown (.md).

Khuyến nghị chia thành nhiều file để dễ quản lý:

docs/
├── SRS/
│   ├── 01_Introduction_Overall_Description.md
│   ├── 02_Actors_Permissions.md
│   ├── 03_Functional_Requirements.md
│   ├── 04_Business_Workflows.md
│   ├── 05_Use_Case_Specification.md
│   ├── 06_UI_UX_Requirements.md
│   ├── 07_Data_Requirements.md
│   ├── 08_Business_Rules_State_Transition.md
│   ├── 09_Non_Functional_Requirements.md
│   ├── 10_Error_Handling.md
│   ├── 11_Traceability_Matrix.md
│   └── 12_Open_Issues_Change_Log.md

Mỗi file phải có cấu trúc rõ ràng, không bị trùng lặp nội dung.

## 10. Yêu cầu bắt đầu

Khi tôi cung cấp BRD đã được phê duyệt, hãy:

1. Đọc và phân tích toàn bộ BRD.
2. Đánh giá mức độ đầy đủ của tài liệu.
3. Đề xuất cấu trúc SRS.
4. Liệt kê danh sách module và số lượng chức năng dự kiến.
5. Chỉ ra những nội dung cần xác nhận.

**Chưa được viết SRS hoàn chỉnh ngay lập tức.**

Chờ tôi xác nhận cấu trúc và phạm vi đặc tả trước khi bắt đầu.

Mục tiêu cuối cùng là tạo ra một bộ SRS chuyên nghiệp, đầy đủ, nhất quán với BRD và đủ chi tiết để làm căn cứ triển khai một sản phẩm QR Queue Management System tương đương QR Wait.