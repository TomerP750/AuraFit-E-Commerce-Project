//package app.aurafitbackend.Beans;
//
//import app.aurafitbackend.Enums.PaymentStatus;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "payment_details")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//public class PaymentDetail {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String cardLast4;
//    private String authTransactionId;
//    @Enumerated(EnumType.STRING)
//    private PaymentStatus paymentStatus;
////    @OneToOne(mappedBy = "paymentDetails")
////    private Order order;
//}
