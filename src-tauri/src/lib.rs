use tauri::Manager;

mod hide_from_switcher;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            #[cfg(target_os = "windows")]
            hide_from_switcher::apply_tool_window_style(&main_window);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
