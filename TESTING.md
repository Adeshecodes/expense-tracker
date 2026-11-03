# Expense Tracker — Manual Tests

Date: 2026-11-02
Browser: Google Chrome

## TC-001: Reject a negative amount

Starting total: ₦26,500

Steps:
1. Enter Lunch as the description.
2. Enter -100 as the amount.
3. Select Food.
4. Click Add expense.

Expected result:
The amount is rejected, no expense is added,
and the total remains ₦26,500.

Actual result:
Value below 1 is rejected

Status:
Pass

## TC-002: Reject zero

Starting total: ₦26,500

Steps:
1. Enter Lunch as the description.
2. Enter 0 as the amount.
3. Select Food.
4. Click Add expense.

Expected result:
The amount is rejected, no expense is added,
and the total remains ₦26,500.

Actual result:
Value must be greater than 1 or equal to 1

Status:
Pass

## TC-003: Reject an amount containing a decimal point

Starting total: ₦26,500

Steps:
1. Enter Lunch as the description.
2. Enter 2.0 as the amount.
3. Select Food.
4. Click Add expense.

Expected result:
The amount is rejected, no expense is added,
and the total remains ₦26,500.

Actual result:
Value with decimal is rejected

Status:
Pass

## TC-004: Reject a space only description

Starting total: ₦26,500

Steps:
1. Enter three spaces as the description.
2. Enter 1000 as the amount.
3. Select Food.
4. Click Add expense.

Expected result:
The description is rejected, no expense is added,
and the total remains ₦26,500.

Actual result:
Just spaces in the description is rejected

Status:
Pass

## TC-005: Reject a missing category

Starting total: ₦26,500

Steps:
1. Enter Lunch as the description.
2. Enter 1000 as the amount.
3. Select choose a category.
4. Click Add expense.

Expected result:
The expense is rejected, no expense is added,
and the total remains ₦26,500.

Actual result:
Expenses with no category type is rejected

Status:
Pass

## TC-006: Accept a valid expense and update the total

Starting total: ₦26,500

Steps:
1. Enter Lunch as the description.
2. Enter 1000 as the amount.
3. Select Food.
4. Click Add expense.

Expected result:
The amount is accepted, expense is added,
and the total changes to ₦27,500.

Actual result:
Expense is accepted and added

Status:
Pass

## TC-007: Delete an Expense

Starting total: ₦27,500

Steps:
1. Enter Lunch as the description.
2. Enter 1000 as the amount.
3. Select Food.
4. Click Add expense.
5. Click the Delete button beside the newly added expense

Expected result:
The amount is accepted, expense is added,
and the total changes to ₦28,500. The delete button is clicked on and the expense is deleted returning the total to ₦27,500

Actual result:
Lunch appeared after submission, and the total increased
from ₦27,500 to ₦28,500.

After clicking Delete beside Lunch, that expense disappeared
and the total returned to ₦27,500. Other expenses remained unchanged.

Status:
Pass

## TC-008: Accept an amount with correctly placed commas

Starting total: ₦27,500

Steps:
1. Enter Transportation as the description.
2. Enter 1,000 as the amount.
3. Select Transport.
4. Click Add expense.

Expected result:
The amount is accepted, expense is added,
and the total changes to ₦28,500. 

Actual result:
Transport appeared after submission, and the total increased
from ₦27,500 to ₦28,500.

Status:
Pass

## TC-009: Reject an amount with incorrectly placed commas

Starting total: ₦28,500

Steps:
1. Enter Transportation as the description.
2. Enter 10,00 as the amount.
3. Select Transport.
4. Click Add expense.

Expected result:
The amount is rejected, expense isn't added,
and the total remains ₦28,500. 

Actual result:
Expense with wrongly placed comma is rejected

Status:
Pass

## TC-010: Preserve a newly added expense after refreshing

Starting total: ₦8,000.
Starting count: 1 

Steps:
1. Enter Persistence test as the description.
2. Enter 1000 as the amount.
3. Select Food.
4. Click Add expense.
5. Refresh the browser.

Expected result:
- The new expense appears exactly once after refreshing.
- The total is ₦1,000 higher than the starting total.
- The count is one higher than the starting count.

Actual result:
The total got increased by 1000 and total became 9000
The expense count changed to 2.

After refreshing the browser:
- Persistence test remained visible exactly once.
- The total remaind 9000
- The expense count remained 2.

Status: Pass


## TC-011: Keep a deleted expense removed after refreshing

Precondition:
The Persistence test expense from TC-010 exists.

Starting total: ₦9,000.

Steps:
1. Record the current total.
2. Delete the Persistence test expense.
3. Refresh the browser.

Expected result:
- The deleted expense does not reappear.
- The total remains ₦1,000 below the value recorded before deletion.

Actual result:
Ater clicking delete, It deleted the persistence test expense and went back to the initial starting total from ₦9,000 to ₦8,000.

After refreshing the browser:
The deleted expense does not reappear in the browser.
The total remained ₦8,000.

Status: Pass


## TC-012: Delete one expense without affecting another

Precondition:
Two manually entered expenses are present
Internet expense of ₦18,000.
Another expense of ₦8,000.

Starting total: ₦26,000
Starting count: 2

Steps:
1. Click Delete beside the Internet expense.
2. Refresh the browser.

Expected result:
- The Internet expense stays deleted.
- Other expense records remain unchanged.
- The total decreases by ₦18,000.
- The count decreases by one.
- The changes remain after refreshing.

Actual result:
Delete button deleted the ₦18,000 Internet expense.
Other expense remains unchanged.
The total decreased from ₦26,000 to ₦8,000.
The expense count decreased from 2 to 1 and new expense count is 1
After refreshing the browser the internet expense stayed deleted, the total remained ₦8,000, and the count remained 1.

Status: Pass
