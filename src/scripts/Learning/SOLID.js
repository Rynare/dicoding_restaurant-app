/*
==================================================================================
?                      Single Responsibility Principle (SRP)
==================================================================================
* Seharusnya tidak akan lebih dari satu alasan sebuah class untuk berubah”. Memang 
* sangatlah menggoda untuk membuat sebuah class dapat melakukan banyak hal. Kita 
* tidak perlu repot memecah dengan membuat banyak class. Jika class terlalu banyak 
* memiliki tanggung jawab, maka akan sulit diorganisir dan dimodifikasi. 
==================================================================================
*/

/*
==================================================================================
!                              Bad Implementation
==================================================================================
*/
class FoodService {
    constructor(id, name, date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }

    addToStore() {
        if (!this.isExpired()) {
            // Add to store
        }
    }

    isExpired() {
        const stringDateArray = this.date.split('/');
        const foodDate = new Date(...stringDateArray);
        return foodDate >= new Date();
    }
}
/*
==================================================================================
*                              Good Implementation
==================================================================================
*/
class FoodExpiry {
    static isExpired(date) {
        const stringDateArray = date.split('/');
        const foodDate = new Date(...stringDateArray);
        return foodDate >= new Date();
    }
}

class FoodService {
    constructor(id, name, date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }

    addToStore() {
        if (!FoodExpiry.isExpired(this.date)) {
            // Add to store
        }
    }
}
/*
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!                                   Ending! 
!                      Single Responsibility Principle (SRP) 
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/

/*
==================================================================================
?                            Open/Closed Principle (OCP)
==================================================================================
* Terbuka untuk ditambahkan adalah keadaan ketika sebuah sistem dapat ditambahkan 
* dengan spesifikasi baru yang dibutuhkan. Sedangkan tertutup untuk dimodifikasi 
* adalah agar ketika ingin menambahkan spesifikasi baru, kita tidak perlu mengubah 
* atau memodifikasi sistem yang telah ada. Intinya, prinsip ini mengharuskan 
* pengguna untuk menambahkan fungsionalitas baru tanpa mengubah kode yang sudah 
* dituliskan.
==================================================================================
*/

/*
==================================================================================
!                Bad Implementation - Before add new functionality
==================================================================================
*/


const WrongShippingType1 = {
    JNE: 'jne',
    TIKI: 'tiki',
};

class ShippingOrderService {
    checkout(product, type) {
        switch (type) {
            case WrongShippingType1.JNE:
                /** do checkout product with shipping type  */
                break;
            case WrongShippingType1.TIKI:
                /** do checkout product with shipping type  */
                break;
            default:
                throw new TypeError('Unsupported shipping type');
        }
    }
}
/*
==================================================================================
!                  Bad Implementation - After add new functionality
==================================================================================
 Fungsi checkout yang berada pada class ShippingOrderService di atas memiliki 
 beberapa statement untuk menentukan nilai biaya kirim product berdasar jenis 
 pengiriman. Untuk saat ini, kode di atas dapat menjalankan tugasnya dengan baik.
 Tetapi, suatu saat dengan kode di atas, jika kita diminta untuk menambahkan  
 jenis pengiriman baru, tentunya kita akan membuat konstanta baru dan  
 menjadikannya kondisi pada statement untuk menentukan tugas yang akan dijalankan.
 Contohnya seperti di bawah ini.
==================================================================================
*/
const WrongShippingType2 = {
    JNE: 'jne',
    TIKI: 'tiki',
    POSINDO: 'posindo', // menambahkan jasa baru.
};

class ShippingOrderService {
    checkout(product, type) {
        switch (type) {
            case WrongShippingType2.JNE:
                /** do checkout product with shipping type */
                break;
            case WrongShippingType2.TIKI:
                /** do checkout product with shipping type */
                break;
            case WrongShippingType2.POSINDO: // akan menambahkan jasa baru juga pada Class. Ini hal yang buruk!
                /** do checkout product with shipping type */
                break;
            default:
                throw new TypeError('Unsupported shipping type');
        }
    }
}
/*
==================================================================================
*               Good Implementation - Before adding new functionality
==================================================================================
*/


class Shipping {
    constructor() {
        if (this.constructor === Shipping) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
    }

    /**
     * Implementation required
     */
    calculate(product) {
        throw new Error('You have to implement the method calculate!');
    }
}

class JNEShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class TIKIShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class ShippingOrderService {
    checkout(product, shipping) {
        const costShipping = shipping.calculate(product);
        /** Code to do check */
    }
}
/*
==================================================================================
*               Good Implementation - After adding new functionality
==================================================================================
 Sehingga untuk menambahkan fungsionalitas baru, kita cukup membuat class baru 
 yang menjadi turunan dari abstraksi.
==================================================================================
*/

class Shipping {
    constructor() {
        if (this.constructor === Shipping) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
    }

    /**
     * Implementation required
     */
    calculate(product) {
        throw new Error('You have to implement the method calculate!');
    }
}

class JNEShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class TIKIShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class POSINDOShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class SiCepatShipping extends Shipping {
    calculate(product) {
        return /** calculate amount of this type with product */;
    }
}

class ShippingOrderService {
    checkout(product, shipping) {
        const costShipping = shipping.calculate(product);
        /** Code to do check */
    }
}

/*
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!                                   Ending! 
!                         Open/Closed Principle (OCP) 
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/

/*
==================================================================================
?                       Liskov Substitution Principle (LSP)
==================================================================================
* Liskov’s Substitution adalah aturan yang berlaku untuk hirarki pewarisan. 
* Hal ini mengharuskan kita untuk mendesain kelas-kelas yang kita miliki sehingga 
* ketergantungan antar klien dapat disubstitusikan tanpa klien mengetahui tentang 
* perubahan yang ada. Oleh karena itu, seluruh SubClass setidaknya dapat berjalan 
* dengan cara yang sama seperti SuperClass-nya.
==================================================================================
*/

/*
==================================================================================
!                               Bad Implementation
==================================================================================
*/

class WrongVehicle {
    constructor() {
        if (this.constructor === WrongVehicle) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
    }

    droveOff() {
        throw new TypeError('Abstract method, cannot be access directly.');
    }

    turnOnEngine() {
        throw new TypeError('Abstract method, cannot be access directly.');
    }
}

class WrongCar extends WrongVehicle {

    droveOff() {
        console.log('Mobil melaju!');
    }

    turnOnEngine() {
        console.log('Mesin Mobil dinyalakan');
    }
}

class WrongBicycle extends WrongVehicle {
    droveOff() {
        console.log('Sepeda melaju!');
    }

    turnOnEngine() {
        // Tunggu, sepeda kan tidak memiliki mesin? Bagaimana cara menyalakannya?
        throw new Error(`${this.constructor.name} don't have an engine`);
    }
}

/*
==================================================================================
*                              Good Implementation
==================================================================================
*/

class Vehicle {
    constructor() {
        if (this.constructor === Vehicle) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
    }

    droveOff() {
        throw new TypeError('Abstract method, cannot be access directly.');
    }
}

class MotorVehicle extends Vehicle {
    constructor() {
        super();
        if (this.constructor === MotorVehicle) {
            throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
        }
    }

    turnOnEngine() {
        throw new TypeError('Abstract method, cannot be access directly.');
    }
}

class Car extends MotorVehicle {
    droveOff() {
        console.log('Mobil melaju!');
    }


    turnOnEngine() {
        console.log('Mesin Mobil dinyalakan');
    }
}

class Bicycle extends Vehicle {
    droveOff() {
        console.log('Sepeda melaju!');
    }
}

/*
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!                                    Ending! 
!                        Liskov Substitution Principle (LSP) 
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/

/*
==================================================================================
?                      Interface Segregation Principle (ISP)
==================================================================================
* Prinsip ini bertujuan untuk mengurangi jumlah ketergantungan sebuah class 
* terhadap interface class yang tidak dibutuhkan. Namun JavaScript sendiri tidak 
* memiliki interface, jadi prinsip ini tidak begitu ketat diterapkan seperti pada 
* bahasa pemrograman lain. Walaupun tidak ketat, konsep ini penting dan relevan 
* terhadap kekurangan JavaScript dalam menangani sebuah tipe data
==================================================================================
*/

/*
==================================================================================
!                              Bad Implementation
==================================================================================
*/

class WrongImageViewer {
    constructor(settings) {
        this._settings = settings;
        this.setup();
    }

    setup() {
        this._image = this._settings.image;
        this._settings.animationModule.setup();
    }

    show() {
        // ...
    }
}

const wrongImageViewer = new WrongImageViewer({
    image: someImage,
    animationModule: someAnimationModule, // ImageViewer selalu membutuhkan animation Module
});

/*
==================================================================================
*                              Good Implementation
==================================================================================
*/

class ImageViewer {
    constructor(settings) {
        this._settings = settings;
        this._options = settings.options;
        this.setup();
    }

    setup() {
        this._image = this._settings.image;
        this.setupOptions();
    }

    setupOptions() {
        if (this._options.animationModule) {
            this._options.animationModule.setup();
        }
        // ...
    }

    show() {
        // ...
    }
}

const imageViewer = new ImageViewer({
    image: someImage,
    options: {
        animationModule: someAnimationModule, // Aman untuk dihapus.
    },
});

/*
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!                                   Ending! 
!                      Interface Segregation Principle (ISP) 
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/

/*
==================================================================================
?                      Dependencies Inversion Principle (DIP)
==================================================================================
* Dalam prinsip ini terdapat 2 pernyataan penting:

* 1. Modul high-level tidak boleh memiliki ketergantungan terhadap modul low-level. 
*    Keduanya harus bergantung pada abstractions.
* 2. Abstractions tidak boleh bergantung terhadap detail. Detail harus bergantung 
*    pada abstractions.

* Mungkin cukup sulit untuk dimengerti pada awalnya. Namun jika Anda sudah pernah 
* mencoba AngularJS, Anda akan sudah pernah melihat implementasi bagaimana prinsip 
* ini diterapkan pada Dependency Injection (DI). Meskipun tidak seutuhnya identik, 
* namun prinsip ini dapat dicapai melalui DI.

* Seperti yang sudah dijelaskan sebelumnya, JavaScript tidak memiliki interfaces. 
* Jadi ketergantungan terhadap abstraction, kontraknya dilakukan secara implisit. 
* Dengan kata lain, kita bisa lihat ketergantungan dari properti dan method yang 
* ada terhadap objek/class lain.
==================================================================================
*/

/*
==================================================================================
!                              Bad Implementation
==================================================================================
*/
class WrongSQLDatabase {
    constructor() {
        this.connection = 'SQLConnection';
    }

    requestItem(item) {
        // ....
    }
}

class WrongProductTracker {
    constructor(items) {
        this._items = items;

        // BAD: Kita membuat ketergantungan terhadap low-level.
        // Seharusnya high-level modul tidak boleh tahu low-level itu siapa.
        this._database = new WrongSQLDatabase();
    }

    requestItems() {
        this._items.forEach((item) => {
            this._database.requestItem(item);
        });
    }
}

const wrongProductTracker = new WrongProductTracker(['A011', 'B032', 'F311']);
wrongProductTracker.requestItems();
/*
==================================================================================
*                              Good Implementation
==================================================================================
*/
class SQLDatabase {
    constructor() {
        this.connection = 'SQLConnection';
    }

    requestItem(item) {
        // ....
    }
}

class MongoDatabase {
    constructor() {
        this.connection = 'MongoConnection';
    }

    requestItem(item) {
        // ...
    }
}

class ProductTracker {
    constructor(items, database) {
        this._items = items;
        this._database = database;
    }

    requestItems() {
        this._items.forEach((item) => {
            this._database.requestItem(item);
        });
    }
}

const productTracker = new ProductTracker(
    ['A011', 'B032', 'F311'],
    new MongoDatabase(), // Good! Sekarang kita bisa gunakan modul low-level apa saja.
);

productTracker.requestItems();
/*
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
!                                   Ending! 
!                      Dependencies Inversion Principle (DIP) 
!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/