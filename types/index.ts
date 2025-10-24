export interface User {
  id_user: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  status: number;
  all_permission: number;
  settings_user: any;
  structures: number[];
  roles: number[];
}

export interface Module {
  id_module: number;
  module: string;
  path: string;
  setting_module_config: {
    key?: string;
    icon?: string;
    route?: string;
    position?: string;
  };
  order: number;
  is_render: number;
  is_render_mobile: number;
  operations?: number[];
}

export interface LoginResponse {
  token: string;
  user: User;
  modules: Module[];
  id_client: number;
  uid_client: string;
  id_instance: number;
  version: {
    api: string;
    oauth: string;
  };
}

export interface DeviceSettings {
  online: number;
  serial: string;
  disabled?: number;
  access_type?: number;
  id_timezone: number;
  exit_btn_pos?: number;
  id_structure: number;
  time_open_door?: number;
  id_device_action_type?: number;
  wifi_settings?: {
    ip: string;
    mask: string;
    ssid: string;
    gateway: string;
    use_dhcp: string;
    use_wifi: number;
  };
  ethernet_settings?: {
    ip: string;
    mask: string;
    gateway: string;
    use_dhcp: string;
  };
}

export interface Device {
  id_device: number;
  device_name: string;
  id_device_model: number;
  settings_device: DeviceSettings;
  status: number;
  device_model: string;
  factory_family: string;
  photo: string;
  hasGroups: boolean;
  entity_group: any;
}

export interface DevicesResponse {
  status: number;
  message: string;
  data: {
    results: Device[];
    count: number;
    limit: number;
    offset: number;
  };
}
export interface DeviceResponse {
  status: number;
  message: string;
  data: {
    result: Device;
    count: number;
    limit: number;
    offset: number;
  };
}
