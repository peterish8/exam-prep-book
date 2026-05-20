export const DSA_CODE_QUESTIONS = [
  {
    id: 1,
    title: "Print 1 to N Using Recursion",
    status: "Added by me",
    concept: "Recursion output order",
    logic: "First go down to the base case, then print while returning back.",
    complexity: "O(n) time, O(n) stack",
    mnemonic: "Go down first, print while coming back.",
    code: `def print_1_to_n(n):
    if n == 0:
        return
    print_1_to_n(n - 1)
    print(n, end=" ")


print_1_to_n(5)`,
  },
  {
    id: 2,
    title: "Check Palindrome",
    status: "Added by me",
    concept: "String reversal",
    logic: "Convert to lowercase and compare the string with its reversed version.",
    complexity: "O(n) time, O(n) space",
    mnemonic: "Same front, same back.",
    code: `def is_palindrome(s):
    s = s.lower()
    return s == s[::-1]


print(is_palindrome("madam"))
print(is_palindrome("hello"))`,
  },
  {
    id: 3,
    title: "Fibonacci Series",
    status: "Added by me",
    concept: "Tree recursion",
    logic: "Each Fibonacci number is the sum of the previous two numbers.",
    complexity: "O(2^n) time, O(n) stack",
    mnemonic: "Fib calls two friends.",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


for i in range(7):
    print(fibonacci(i), end=" ")`,
  },
  {
    id: 4,
    title: "Recurring Digit Sum",
    status: "Added by me",
    concept: "Digit recursion",
    logic: "Take the last digit using modulo and solve the remaining number recursively.",
    complexity: "O(d) time, O(d) stack",
    mnemonic: "Last digit plus rest.",
    code: `def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)


print(digit_sum(9876))`,
  },
  {
    id: 5,
    title: "Tower of Hanoi",
    status: "PDF-style",
    concept: "Recursive transfer",
    logic: "Move n-1 disks aside, move the biggest disk, then move n-1 disks back onto it.",
    complexity: "O(2^n) time, O(n) stack",
    mnemonic: "Small aside, big moves, small back.",
    code: `def tower_of_hanoi(n, source, auxiliary, destination):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return

    tower_of_hanoi(n - 1, source, destination, auxiliary)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, source, destination)


tower_of_hanoi(3, "A", "B", "C")`,
  },
  {
    id: 6,
    title: "Merge Sort",
    status: "Added by me",
    concept: "Divide and conquer",
    logic: "Split the array, recursively sort both halves, then merge the sorted halves.",
    complexity: "O(n log n) time, O(n) space",
    mnemonic: "Split, sort, merge.",
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    merged = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged


print(merge_sort([5, 2, 9, 1, 7]))`,
  },
  {
    id: 7,
    title: "Quick Sort",
    status: "Added by me",
    concept: "Pivot partition",
    logic: "Pick a pivot, put smaller values on the left and bigger values on the right, then recursively sort.",
    complexity: "Average O(n log n), worst O(n^2)",
    mnemonic: "Pivot decides sides.",
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)


print(quick_sort([8, 4, 2, 9, 5, 7]))`,
  },
  {
    id: 8,
    title: "Next Smaller Element",
    status: "Added by me",
    concept: "Monotonic stack",
    logic: "Scan from right and keep only useful smaller candidates in the stack.",
    complexity: "O(n) time, O(n) space",
    mnemonic: "Pop bigger, keep smaller.",
    code: `def next_smaller_element(arr):
    stack = []
    result = [-1] * len(arr)

    for i in range(len(arr) - 1, -1, -1):
        while stack and stack[-1] >= arr[i]:
            stack.pop()

        if stack:
            result[i] = stack[-1]

        stack.append(arr[i])

    return result


print(next_smaller_element([4, 8, 5, 2, 25]))`,
  },
  {
    id: 9,
    title: "Push and Pop in Stack",
    status: "Added by me",
    concept: "Basic stack operations",
    logic: "append pushes to top, pop removes the last added element.",
    complexity: "O(1) average per operation",
    mnemonic: "Last in, first out.",
    code: `stack = []

stack.append(10)
stack.append(20)
stack.append(30)
print("After push:", stack)

removed = stack.pop()
print("Popped:", removed)
print("After pop:", stack)`,
  },
  {
    id: 10,
    title: "Peek, isEmpty, isFull in Stack",
    status: "Added by me",
    concept: "Stack ADT",
    logic: "Class wraps stack behavior with helper methods for top, empty, and full checks.",
    complexity: "O(1) helpers",
    mnemonic: "Check before touch.",
    code: `class Stack:
    def __init__(self, size):
        self.stack = []
        self.size = size

    def push(self, value):
        if self.is_full():
            print("Stack is full")
            return
        self.stack.append(value)

    def peek(self):
        if self.is_empty():
            return None
        return self.stack[-1]

    def is_empty(self):
        return len(self.stack) == 0

    def is_full(self):
        return len(self.stack) == self.size


s = Stack(3)
s.push(10)
s.push(20)
print(s.peek())
print(s.is_empty())
print(s.is_full())`,
  },
  {
    id: 11,
    title: "Evaluate Expression",
    status: "Added by me",
    concept: "Postfix stack evaluation",
    logic: "Numbers are pushed. When an operator appears, pop two numbers and apply the operator.",
    complexity: "O(n) time, O(n) space",
    mnemonic: "Numbers wait, operator acts.",
    code: `def evaluate_postfix(expression):
    stack = []

    for ch in expression.split():
        if ch.lstrip("-").isdigit():
            stack.append(int(ch))
        else:
            b = stack.pop()
            a = stack.pop()

            if ch == "+":
                stack.append(a + b)
            elif ch == "-":
                stack.append(a - b)
            elif ch == "*":
                stack.append(a * b)
            elif ch == "/":
                stack.append(a // b)

    return stack[0]


print(evaluate_postfix("2 3 1 * + 9 -"))`,
  },
  {
    id: 12,
    title: "Valid Parentheses",
    status: "PDF-style",
    concept: "Bracket matching",
    logic: "Opening brackets are pushed. Closing brackets must match the stack top.",
    complexity: "O(n) time, O(n) space",
    mnemonic: "Open push, close match.",
    code: `def is_valid(s):
    stack = []
    pairs = {
        ")": "(",
        "}": "{",
        "]": "[",
    }

    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    return len(stack) == 0


print(is_valid("([]{})"))
print(is_valid("([)]"))`,
  },
  {
    id: 13,
    title: "isEmpty, isFull Functions of Queue",
    status: "PDF-style",
    concept: "Queue capacity checks",
    logic: "Check if queue length is zero or equal to fixed size.",
    complexity: "O(1)",
    mnemonic: "Empty zero, full size.",
    code: `class Queue:
    def __init__(self, size):
        self.queue = []
        self.size = size

    def is_empty(self):
        return len(self.queue) == 0

    def is_full(self):
        return len(self.queue) == self.size


q = Queue(3)
print(q.is_empty())
print(q.is_full())`,
  },
  {
    id: 14,
    title: "Sliding Window Maximum",
    status: "Added by me",
    concept: "Monotonic deque",
    logic: "Deque stores indexes of useful maximum candidates for each window.",
    complexity: "O(n) time, O(k) space",
    mnemonic: "Window moves, deque proves.",
    code: `from collections import deque


def sliding_window_max(nums, k):
    dq = deque()
    answer = []

    for i in range(len(nums)):
        while dq and dq[0] <= i - k:
            dq.popleft()

        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            answer.append(nums[dq[0]])

    return answer


print(sliding_window_max([1, 3, -1, -3, 5, 3, 6, 7], 3))`,
  },
  {
    id: 15,
    title: "Enqueue and Dequeue Functions",
    status: "PDF-style",
    concept: "Queue operations",
    logic: "append adds at rear; popleft removes from front.",
    complexity: "O(1) per operation",
    mnemonic: "First in, first out.",
    code: `from collections import deque


queue = deque()

queue.append(10)
queue.append(20)
queue.append(30)
print("After enqueue:", list(queue))

removed = queue.popleft()
print("Dequeued:", removed)
print("After dequeue:", list(queue))`,
  },
  {
    id: 16,
    title: "Preorder Traversal",
    status: "PDF-style",
    concept: "Root-left-right DFS",
    logic: "Visit root first, then recursively visit left and right subtree.",
    complexity: "O(n) time, O(h) stack",
    mnemonic: "Root first.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def preorder(root):
    if not root:
        return
    print(root.value, end=" ")
    preorder(root.left)
    preorder(root.right)`,
  },
  {
    id: 17,
    title: "Postorder Traversal",
    status: "PDF-style",
    concept: "Left-right-root DFS",
    logic: "Visit children first, then process the root.",
    complexity: "O(n) time, O(h) stack",
    mnemonic: "Root last.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.value, end=" ")`,
  },
  {
    id: 18,
    title: "Inorder Traversal",
    status: "PDF-style",
    concept: "Left-root-right DFS",
    logic: "Visit left, then root, then right. In BST, this gives sorted order.",
    complexity: "O(n) time, O(h) stack",
    mnemonic: "Root in middle.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.value, end=" ")
    inorder(root.right)`,
  },
  {
    id: 19,
    title: "Level Order Traversal",
    status: "Added by me",
    concept: "BFS using queue",
    logic: "Queue stores nodes level by level and processes them in FIFO order.",
    complexity: "O(n) time, O(w) space",
    mnemonic: "Queue reads levels.",
    code: `from collections import deque


def level_order(root):
    if not root:
        return

    q = deque([root])

    while q:
        node = q.popleft()
        print(node.value, end=" ")

        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)`,
  },
  {
    id: 20,
    title: "Minimum Depth of Binary Tree",
    status: "Added by me",
    concept: "BFS shortest depth",
    logic: "The first leaf found in BFS is the closest leaf, so its depth is minimum.",
    complexity: "O(n) time, O(w) space",
    mnemonic: "First leaf is closest.",
    code: `from collections import deque


def min_depth(root):
    if not root:
        return 0

    q = deque([(root, 1)])

    while q:
        node, depth = q.popleft()

        if not node.left and not node.right:
            return depth

        if node.left:
            q.append((node.left, depth + 1))
        if node.right:
            q.append((node.right, depth + 1))`,
  },
  {
    id: 21,
    title: "Check for BST",
    status: "Added by me",
    concept: "Range validation",
    logic: "Every node must stay inside a valid low-high range.",
    complexity: "O(n) time, O(h) stack",
    mnemonic: "Range protects BST.",
    code: `def is_bst(root, low=float("-inf"), high=float("inf")):
    if not root:
        return True

    if not (low < root.value < high):
        return False

    return is_bst(root.left, low, root.value) and is_bst(root.right, root.value, high)`,
  },
  {
    id: 22,
    title: "ZigZag Traversal",
    status: "Added by me",
    concept: "Alternating level order",
    logic: "Perform level order traversal and reverse every alternate level.",
    complexity: "O(n) time, O(w) space",
    mnemonic: "Direction flips each level.",
    code: `from collections import deque


def zigzag_traversal(root):
    if not root:
        return []

    result = []
    q = deque([root])
    left_to_right = True

    while q:
        level = []

        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.value)

            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)

        if not left_to_right:
            level.reverse()

        result.append(level)
        left_to_right = not left_to_right

    return result`,
  },
  {
    id: 23,
    title: "Top View of Binary Tree",
    status: "Added by me",
    concept: "Horizontal distance BFS",
    logic: "Store the first node seen at every horizontal distance.",
    complexity: "O(n log n) due to sorting",
    mnemonic: "First at distance wins.",
    code: `from collections import deque


def top_view(root):
    if not root:
        return []

    q = deque([(root, 0)])
    first_at_hd = {}

    while q:
        node, hd = q.popleft()

        if hd not in first_at_hd:
            first_at_hd[hd] = node.value

        if node.left:
            q.append((node.left, hd - 1))
        if node.right:
            q.append((node.right, hd + 1))

    return [first_at_hd[key] for key in sorted(first_at_hd)]`,
  },
  {
    id: 24,
    title: "Left Side View of Binary Tree",
    status: "Added by me",
    concept: "First node per level",
    logic: "During level order traversal, record the first node of every level.",
    complexity: "O(n) time, O(w) space",
    mnemonic: "First node each level.",
    code: `from collections import deque


def left_view(root):
    if not root:
        return []

    q = deque([root])
    answer = []

    while q:
        level_size = len(q)

        for i in range(level_size):
            node = q.popleft()

            if i == 0:
                answer.append(node.value)

            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)

    return answer`,
  },
  {
    id: 25,
    title: "Search in BST",
    status: "Added by me",
    concept: "BST directed search",
    logic: "Compare the key with current node and move left or right.",
    complexity: "Average O(log n), worst O(n)",
    mnemonic: "Compare and choose.",
    code: `def search_bst(root, key):
    if not root or root.value == key:
        return root

    if key < root.value:
        return search_bst(root.left, key)

    return search_bst(root.right, key)`,
  },
  {
    id: 26,
    title: "Find Maximum Node in BST",
    status: "Added by me",
    concept: "Rightmost node",
    logic: "In BST, bigger values are on the right, so keep moving right.",
    complexity: "O(h) time",
    mnemonic: "Rightmost is maximum.",
    code: `def find_max_bst(root):
    if not root:
        return None

    while root.right:
        root = root.right

    return root.value`,
  },
  {
    id: 27,
    title: "Kth Largest Node in BST",
    status: "Added by me",
    concept: "Reverse inorder",
    logic: "Right-root-left traversal visits BST values in descending order.",
    complexity: "O(n) worst, O(h+k) ideal",
    mnemonic: "Right first means larger first.",
    code: `def kth_largest(root, k):
    answer = []

    def reverse_inorder(node):
        if not node or len(answer) >= k:
            return
        reverse_inorder(node.right)
        answer.append(node.value)
        reverse_inorder(node.left)

    reverse_inorder(root)
    return answer[k - 1] if len(answer) >= k else None`,
  },
  {
    id: 28,
    title: "Create BST",
    status: "Added by me",
    concept: "BST insertion",
    logic: "Insert values one by one by following smaller-left and bigger-right rule.",
    complexity: "Average O(n log n), worst O(n^2)",
    mnemonic: "Walk, compare, place.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, key):
    if root is None:
        return Node(key)

    if key < root.value:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)

    return root


values = [50, 30, 70, 20, 40, 60, 80]
root = None

for value in values:
    root = insert(root, value)`,
  },
];

export function explainPythonLine(line) {
  const t = line.trim();
  if (!t) return "Blank line: only spacing, used to keep code readable.";
  if (t.startsWith("def ")) return "Function definition: this creates a reusable block. The name says what problem is being solved, and inputs go inside brackets.";
  if (t.startsWith("class ")) return "Class definition: this creates a blueprint for objects like Stack, Queue, or Node.";
  if (t.startsWith("from collections import deque")) return "Imports deque, a fast queue/deque structure useful for BFS and sliding window problems.";
  if (t.includes("__init__")) return "Constructor: this runs when a new object is created and initializes its data.";
  if (t.includes("self.")) return "self means the current object. This line stores or reads data belonging to that object.";
  if (t.startsWith("if not root") || t.includes("root is None")) return "Tree base case: if the node does not exist, stop safely.";
  if (t.startsWith("if n ==") || t.startsWith("if n <") || t.startsWith("if len(") || t.startsWith("if not")) return "Base or guard condition: handles the smallest or invalid case before the main logic continues.";
  if (t.startsWith("if ")) return "Condition check: this controls when the algorithm should stop, branch, or guard against invalid cases.";
  if (t.startsWith("return")) return "Return sends the result back to the caller. In recursion, this is how answers travel back up the call stack.";
  if (t.includes("append(")) return "append adds an item. In stack it works like push; in queue or deque it often adds to the rear.";
  if (t.includes("popleft(")) return "popleft removes the front item, giving proper queue FIFO behavior.";
  if (t.includes("pop(")) return "pop removes an item. In a stack, it removes the top or latest item.";
  if (t.startsWith("while ")) return "while loop repeats until the condition fails. Here it usually processes a stack, queue, or node chain.";
  if (t.startsWith("for ")) return "for loop repeats over items or range, commonly used to scan arrays or process tree levels.";
  if (t.includes("pivot")) return "Pivot line: Quick Sort uses pivot to separate smaller and larger elements.";
  if (t.includes("mid")) return "Middle split: used by merge sort to divide the array into two halves.";
  if (t.includes("stack")) return "Stack-related line: remembers items in Last-In-First-Out order.";
  if (t.includes("q =") || t.includes("queue") || t.includes("deque")) return "Queue or deque line: used to process items in order, especially BFS and windows.";
  if (t.includes("left") || t.includes("right")) return "Left/right line: used in trees, BST decisions, or divide-and-conquer splitting.";
  if (t.includes("%") || t.includes("//")) return "Digit or math trick: modulo gets remainder/last digit, and integer division reduces the number.";
  if (t.includes("print(")) return "Output line: prints the result so you can check the algorithm behavior.";
  if (t.includes("=")) return "Assignment: stores a value in a variable for later use.";
  return "Important step: this line moves the algorithm forward by checking, storing, calculating, or calling another step.";
}
