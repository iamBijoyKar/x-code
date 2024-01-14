
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn generate_menu()-> Menu {
// File Menu
    let menu_item_file_open = CustomMenuItem::new("open".to_string(), "Open").accelerator("Ctrl+O".to_string());
    let menu_item_file_save = CustomMenuItem::new("save".to_string(), "Save").accelerator("Ctrl+S".to_string());
    let menu_item_file_save_as = CustomMenuItem::new("save_as".to_string(), "Save As").accelerator("Ctrl+Shift+S".to_string());
    let menu_item_file_new = CustomMenuItem::new("new".to_string(), "New").accelerator("Ctrl+N".to_string());

    let submenu_file = Submenu::new("File", Menu::new()
        .add_item(menu_item_file_new)
        .add_item(menu_item_file_open)
        .add_item(menu_item_file_save)
        .add_item(menu_item_file_save_as)
    );

    // Edit Menu
    let menu_item_edit_undo = CustomMenuItem::new("undo".to_string(), "Undo").accelerator("Ctrl+Z".to_string());
    let menu_item_edit_redo = CustomMenuItem::new("redo".to_string(), "Redo").accelerator("Ctrl+Shift+Z".to_string());
    let menu_item_edit_cut = CustomMenuItem::new("cut".to_string(), "Cut").accelerator("Ctrl+X".to_string());
    let menu_item_edit_copy = CustomMenuItem::new("copy".to_string(), "Copy").accelerator("Ctrl+C".to_string());
    let menu_item_edit_paste = CustomMenuItem::new("paste".to_string(), "Paste").accelerator("Ctrl+V".to_string());
    let menu_item_edit_delete = CustomMenuItem::new("delete".to_string(), "Delete").accelerator("Delete".to_string());
    let menu_item_edit_select_all = CustomMenuItem::new("select_all".to_string(), "Select All").accelerator("Ctrl+A".to_string());
    
    let submenu_edit = Submenu::new("Edit", Menu::new()
        .add_item(menu_item_edit_undo)
        .add_item(menu_item_edit_redo)
        .add_item(menu_item_edit_cut)
        .add_item(menu_item_edit_copy)
        .add_item(menu_item_edit_paste)
        .add_item(menu_item_edit_delete)
        .add_item(menu_item_edit_select_all)
    );


    let submenu_view = Submenu::new("View", Menu::new());
    let submenu_terminal = Submenu::new("Terminal", Menu::new());
    let submenu_help = Submenu::new("Help", Menu::new());

    let menu:Menu = Menu::new()
    .add_submenu(submenu_file)
    .add_submenu(submenu_edit)
    .add_submenu(submenu_view)
    .add_submenu(submenu_terminal)
    .add_submenu(submenu_help);

    return menu;
}