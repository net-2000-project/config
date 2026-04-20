# Technical Project Context: NET-2000

## 1. Системная Архитектура
Проект переведен на схему **Reverse Proxy Exit Nodes**. Центральный сервер Marzban выступает в роли диспетчера, а удаленные устройства — в роли выходных шлюзов.

### Master Server (Aeza)
- **ОС**: Ubuntu 24.04.4 LTS
- **IP**: `net-2000.duckdns.org`
- **Network Mode**: `host`
- **Порты**: 
  - `443` (VLESS-TCP-Reality)
  - `2053` (VLESS-gRPC-Reality) — *Оптимизировано для МТС/LTE*
  - `49152` (API/Panel/Sub)

### Residential Nodes (Slaves)
- **Устройства**: MacBook Air (Венгрия), Raspberry Pi 5 (в планах).
- **Метод связи**: Обратный туннель к Master-серверу (исключает необходимость настройки Port Forwarding на домашних роутерах).
- **Автоматизация**: Скрипты автозапуска туннеля и обновления DuckDNS (на стороне клиента).

## 2. Конфигурация Ядра (Xray)
- **Reality Dest**: `www.icloud.com` (Apple) / `dl.google.com` (Google).
- **gRPC Service Name**: `google-update-grpc`.
- **Маршрутизация**:
    - `DIRECT`: Весь RU-трафик (банки, госуслуги, домены .ru).
    - `BLOCK`: BitTorrent (порты 6881-6889).
    - `Vencs_Outbound`: Весь зарубежный трафик принудительно направляется в туннель к резидентной ноде.

## 3. Клиентские настройки (Shadowrocket)
Конфигурация синхронизируется через [GitHub Raw](https://github.com/net-2000-project/config/raw/refs/heads/main/shadowrocket_v1).
- **DNS**: Принудительный DoH (`https://1.1.1.1/dns-query`).
- **MTU**: Для мобильных сетей РФ жестко задано значение **1280**.
- **IPv6**: Отключен для предотвращения утечек мимо туннеля.

## 4. План разработки (Backlog)
- [ ] **Tunneling**: Выбор и внедрение стабильного протокола для связи Master <-> Slave (WireGuard over TLS или GOST).
- [ ] **Automation**: Скрипт "одной кнопки" для настройки Raspberry Pi у нового друга-хоста.
- [ ] **Distribution**: Перенос выдачи подписок за Cloudflare для защиты IP Master-сервера.
- [ ] **Monitoring**: Настройка алертов в Telegram при падении резидентных узлов.

## 5. Доступы
- **SSH Master**: Доступ по ключам.
- **Панель**: `https://net-2000.duckdns.org:49152`
