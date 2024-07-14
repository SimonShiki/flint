use tauri::{Runtime, Window};
use windows_sys::Win32::UI::WindowsAndMessaging::{GetWindowLongW, SetWindowLongW, GWL_EXSTYLE, WS_EX_TOOLWINDOW};

pub fn apply_tool_window_style<R: Runtime>(window: &Window<R>) {
    let hwnd = window.hwnd().unwrap().0;
    unsafe {
        let ex_style = GetWindowLongW(hwnd, GWL_EXSTYLE);
        SetWindowLongW(hwnd, GWL_EXSTYLE, ex_style | WS_EX_TOOLWINDOW as i32);
    }
}