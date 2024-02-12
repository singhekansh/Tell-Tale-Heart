## Platform for Student Gymkhana Office

This platform aims to automate the approval process for events and purchases undertaken by Student Gymkhana clubs and societies.

**Main features:**

* **Approval workflow:** Requests proceed through a defined chain of approvals based on amount and urgency.
* **Automated notifications:** Students Office receives auto-filled forms upon final approval.
* **Data storage:** Information is saved in an external spreadsheet accessible to the Students Office.
* **Access control:** Different user roles have varying access levels for viewing and approving requests.
* **Reporting:** Generates reports upon approval, preferably in PDF format.
* **Security:** Database security and access control ensure data integrity.
* **User-friendly interface:** Easy-to-use interface for all users.
* **Dynamic data management:** Clubs, societies, and their FAs can be added or removed by the administrator.

**Approval process:**

1. **Request generation:** Clubs submit requests with details and (optional) monetary information.
2. **Approval chain:**
    * Up to ₹15,000: Club FA > Society FA
    * ₹15,000 - ₹50,000: Secretary > Club FA > Society FA > ChairSAP
    * > ₹50,000: Secretary > Club FA > Society FA > ChairSAP > Dean Students
3. **Visibility:**
    * Society secretaries/FAs: access their society's approval chain and total funds used.
    * Clubs/FAs: access approvals/expenses for their club and total funds used.
    * ChairSAP/Dean Students/Students Office: access any approval chain.
4. **Priority and timeline:**
    * Normal: 3 days (excluding weekends)
    * Urgent: 24 hours (excluding weekends) - decided by Society/Club FA
5. **Conversation chain:** Comments can be added at any approval point.

**Additional notes:**

* Society funds limit of ₹15,000 applies per society, not per club.
* System adjusts approval chain for urgent requests or exceeding monthly limits.

**Example:**

A request for ₹14,000 equipment by Yantrik club will follow the regular approval chain and be visible to the Students Office only after approval.

This platform aims to streamline the approval process, saving time and ensuring efficient resource allocation for student activities.
