class I18nService {
    constructor() {
      this.locale = 'tr';
      this.translations = {
        tr: {
          firstName: 'Adı',
          lastName: 'Soyad',
          dateOfEmployment: 'İşe Giriş Tarihi',
          dateOfBirth: 'Doğum Tarihi',
          phone: 'Telefon',
          email: 'E-posta',
          department: 'Departman',
          navigationEmployee: 'Çalışanlar',
          navigationAdd: 'Yeni Ekle',
          actions: 'İşlemler',
          position: 'Pozisyon',
          employeeListHeader: 'Çalışan Listesi',
          save: 'Kaydet',
          modal: {
            areYouSure: 'Emin misiniz?',
            selectedEmployeeWillBeDeleted: 'Seçilen çalışan',
            willBeDeleted: 'silinecektir',
            proceed: 'Devam',
            cancel: 'İptal'
          },
          departments: {
            Tech: 'Teknoloji',
            Analytics: 'Analitik',
          },
          positions: {
            Junior: 'Junior',
            Medior: 'Medior',
            Senior: 'Senior'
          },
          list: {
            title: 'Çalışan Listesi',
            addEmployee: 'Yeni Çalışan Ekle',
            actions: 'İşlemler',
            edit: 'Düzenle',
            delete: 'Sil',
            confirmDelete: 'Silmek istediğinizden emin misiniz?',
            noEmployees: 'Henüz çalışan bulunmamaktadır.',
            fullName: 'Ad Soyad',
            department: 'Departman',
            position: 'Pozisyon',
            phone: 'Telefon',
            email: 'E-posta'
          }
        },
        en: {
          firstName: 'First Name',
          lastName: 'Last Name',
          dateOfEmployment: 'Employment Date',
          dateOfBirth: 'Date of Birth',
          phone: 'Phone',
          email: 'Email',
          department: 'Department',
          position: 'Position',
          employeeListHeader: 'Employee List',
          navigationEmployee: 'Employees',
          navigationAdd: 'Add New',
          actions: 'Actions',
          save: 'Save',
          modal: {
            areYouSure: 'Are you Sure?',
            selectedEmployeeWillBeDeleted: 'Selected Employee record of',
            willBeDeleted: 'will be deleted',
            proceed: 'Proceed',
            cancel: 'Cancel'
          },
          departments: {
            Tech: 'Tech',
            Analytics: 'Analytics',
          },
          positions: {
            Junior: 'Junior',
            Medior: 'Medior',
            Senior: 'Senior'
          },
          list: {
            title: 'Employee List',
            addEmployee: 'Add New Employee',
            actions: 'Actions',
            edit: 'Edit',
            delete: 'Delete',
            confirmDelete: 'Are you sure you want to delete?',
            noEmployees: 'No employees found.',
            fullName: 'Full Name',
            department: 'Department',
            position: 'Position',
            phone: 'Phone',
            email: 'Email'
          }
        }
      };
    }
  
    setLocale(locale) {
      if (this.translations[locale]) {
        this.locale = locale;
      }
    }
  
    t(key) {
      const keys = key.split('.');
      let value = this.translations[this.locale];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    }
  }
  
  export const i18n = new I18nService();