class LibraryItem { 
    constructor(id, title, isAvailable = true) {
        this.id = id;
        this.title = title;
        this.isAvailable = isAvailable;
    }
    description() { // يفضل دائماً البدء بحرف صغير للدوال describe أو description
        return `Item : ${this.title} (ID: ${this.id})`;
    }
    borrow() { this.isAvailable = false; }
    returnItem() { this.isAvailable = true; }
}

class Book extends LibraryItem {
    // تم تصحيح ترتيب المعاملات هنا: isbn أصبح قبل isAvailable
    constructor(id, title, author, isbn, isAvailable = true) {
        super(id, title, isAvailable);
        this.author = author;
        this.isbn = isbn;
    }
    description() {
        return `Book : ${this.title} by ${this.author} (ID: ${this.id}, ISBN: ${this.isbn})`;
    }
}

class Member { 
    #balance = 0;
    constructor(name) { this.name = name; }
    deposit(amount) { this.#balance += amount; }
    getBalance() { return this.#balance; }
}

class LibraryCatalog {
    constructor () { this.items = []; }
    addItem(item) { this.items.push(item); }

    // AI used to generate unique IDs for items, ensuring no duplicates
    static nextId(prefix) {
        if (!this.counters) this.counters = {};
        if (!this.counters[prefix]) this.counters[prefix] = 0;
        return `${prefix}${++this.counters[prefix]}`;
    }
    
    registerLoan({ memberId, itemId }){
        console.log(`Member ${memberId} borrowed item ${itemId}`);
    }

    snapshotStats(){
        const total = this.items.length;
        const available = this.items.filter(item => item.isAvailable).length;
        return { total, available }; // أعدنا التسمية لتطابق الاستدعاء في الأسفل
    }
}

// --- التنفيذ ---
const catalog = new LibraryCatalog();

const [book1Info, book2Info] = [
    { id: LibraryCatalog.nextId("B"), title: "Clean Code", author: "Robert Martin", isbn: "123" },
    { id: LibraryCatalog.nextId("B"), title: "Refactoring", author: "Martin Fowler", isbn: "456" }
];

const b1 = new Book(book1Info.id, book1Info.title, book1Info.author, book1Info.isbn);
const b2 = new Book(book2Info.id, book2Info.title, book2Info.author, book2Info.isbn);

catalog.addItem(b1);
catalog.addItem(b2);

catalog.registerLoan({ memberId: "M101", itemId: b1.id });
b1.borrow();
catalog.registerLoan({ memberId: "M101", itemId: b2.id });
b2.borrow();

// الآن الأسماء متطابقة مع ما تُرجعه الدالة
const { total, available } = catalog.snapshotStats();

console.log(b1.description());
console.log(`Stats -> Total: ${total}, Available: ${available}`);