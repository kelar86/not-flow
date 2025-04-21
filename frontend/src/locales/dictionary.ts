const resources = {
    en: {
      translation: {
        buttons: {
            save: "Save",
            cancel: "Cancel",
            edit: "Edit",
            confirm: "Confirm",
            continue: "Сontinue",
            delete: "Delete"
        },
        login: {
            log_out: "Log out",
            log_in: "Log in",
            sign_up: "Sign up",
            logged_in: "Logged in as",
            have_acc: "Already have an account?",
            dont_have_acc: "Don't have an account?",
            user: "User",
            username: "Username",
            mail: "Email",
            password: "Password",
            forgot: "Forgot password?",
            confirm: "Confirm password",
            required_username: "Username is required",
            required_password: "Password is required",
            required_mail: "Email is required",
            required_confirm: "Password confirmation is required",
            recovery: "Password Recovery",
            recovery_desc:"A password recovery email will be sent to the registered account.",
        },
        menu: {
            title: "Menu",
            dashboard: "Dashboard",
            items: "Bot list",
            settings: "User setting"
        },
        welcome: {
            greet: "Hi",
            greeting_text: "Welcome back, nice to see you again!"
        },
        settings: {
            title: "User Settings",
            profile: {
                subtitle: "My profile",
                updated_success: "User updated successfully."
            },
            password: {
                subtitle: "Password",
                change: "Change password",
                current: "Current password",
                new: "New password",
                updated_success: "Password updated successfully.",
            },
            appearance: {
                subtitle: "Appearance",
                system: "System",
                light: "Light Mode",
                dark: "Dark Mode"
            },
            danger: {
                subtitle: "Danger zone",
                delete_acc: "Delete Account",
                warning: "Permanently delete your data and everything associated with your account.",
                confirm_title: "Confirmation Required",
                confirm_desc: "All your account data will be <strong>permanently deleted.</strong> If you are sure, please click <strong>'Confirm'</strong> to proceed. This action cannot be undone.",
                delete_success: "Your account has been successfully deleted."
            },
        },
        items: {
            list: "Bot list",
            add_item: "Add bot",
            no_items: "You don't have any bots yet",
            no_items_desc: "Start by adding your first bot.",
            delete_warning: "This item will be permanently deleted. Are you sure? You will not be able to undo this action.",
            delete_success: "The bot was deleted successfully.",
            delete_error: "An error occurred while deleting the bot.",
            create: "Let's start to create you own bot!",
            create_desc: "Fill in the details to add a new bot.",
            bot_name: "Name",
            bot_desc: "Description",
            required_name: "Name is required",
            update_success: "Bot updated successfully.",
            create_success: "Bot created successfully."
        },
        table: {
          id: "ID",
          title: "Title",
          description: "Description",
          actions: "Actions",
          empty_description: "N/A",
        },
        page_heading: "Items",
      },
    },
    ru: {
      translation: {
        buttons: {
            save: "Сохранить",
            cancel: "Отменить",
            edit: "Редактировать",
            confirm: "Подтвердить",
            continue: "Продолжить",
            delete: "Удалить"
        },
        login: {
            log_out: "Выйти",
            log_in: "Войти",
            sign_up: "Создать аккаунт",
            logged_in: "Войти как",
            have_acc: "У вас уже есть аккаунт?",
            dont_have_acc: "Еще не зарегистрированы?",
            user: "Пользователь",
            username: "Имя",
            mail: "Email",
            password: "Пароль",
            forgot: "Забыли пароль?",
            confirm: "Подтвердите пароль",
            required_username: "Имя обязательно",
            required_password: "Пароль обязателен",
            required_mail: "Email обязателен",
            required_confirm: "Подтвердите пароль",
            recovery: "Восстановление пароля",
            recovery_desc:"На зарегистрированную учетную запись будет отправлено письмо для восстановления пароля.",
        },
        menu: {
            title: "Меню",
            dashboard: "Основное меню",
            items: "Список ботов",
            settings: "Настройки"
        },
        welcome: {
            greet: "Добрый день",
            greeting_text: "Добро пожаловать, рады видеть Вас снова!"
        },
        settings: {
            title: "Мои настройки",
            profile: {
                subtitle: "Мой профиль",
                updated_success: "Профиль успешно обновлен."
            },
            password: {
                subtitle: "Пароль",
                change: "Изменить пароль",
                current: "Текущий пароль",
                new: "Новый пароль",
                updated_success: "Пароль успешно обновлен."
            },
            appearance: {
                subtitle: "Внешний вид",
                system: "Системный",
                light: "Светлый режим",
                dark: "Темный режим"
            },
            danger: {
                subtitle: "Удаление",
                delete_acc: "Удалить аккаунт",
                warning: "Вы полностью удалите совй аккаунт и все данные, связанные с вашей учетной записью.",
                confirm_title: "Вы действительно хотите удалить аккаунт?",
                confirm_desc: "Все данные вашего аккаунта будут <strong>удалены навсегда.</strong><br>Если вы уверены, пожалуйста, нажмите <strong>'Подтвердить'.<br></strong> Это действие нельзя отменить.",
                delete_success: "Ваш аккаунт успешно удален."
            },
        },
        items: {
            list: "Список ботов",
            add_item: "Добавить бота",
            no_items: "У вас пока нет ботов",
            no_items_desc: "Начните с добавления первого бота.",
            delete_warning: "Этот бот будет удален. Вы уверены? Вы не сможете отменить это действие.",
            delete_success: "Бот успешно удален.",
            delete_error: "При удалении бота произошла ошибка.",
            create: "Давайте начнем создавать вашего бота!",
            create_desc: "Пожалуйста. заполните:",
            bot_name: "Имя",
            bot_desc: "Описание",
            required_name: "Имя обязательно",
            update_success: "Бот успешно обновлен.",
            create_success: "Бот успешно создан."
        },
        table: {
          id: "Идентификатор",
          title: "Название",
          description: "Описание",
          actions: "Действия",
          empty_description: "—",
        },
        page_heading: "Предметы",
      },
    },
  };

  export default resources