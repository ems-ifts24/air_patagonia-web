from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select



# Ruta local al HTML
ruta_local =  "http://localhost:4200/login"

# Iniciar la Navegacion
driver = webdriver.Chrome() # Definir el navegador a utilizar
driver.get(ruta_local)
wait = WebDriverWait(driver, 5)  # espera hasta 10 segundos
driver.maximize_window()
time.sleep(2)

# Selector del tipo id = Identificador del elemento
#tuusuario
txt_usuario = wait.until(EC.presence_of_element_located((By.ID, "inputUsuario")))# seleccionando el cuadro de texto
txt_usuario.send_keys("admin")  # enviando un texto como si alguien lo escribiera
time.sleep(1)
#tuclave
txt_clave = wait.until(EC.presence_of_element_located((By.ID, "inputPassword"))) # seleccionando el cuadro de texto
txt_clave.send_keys("admin")  # enviando un texto como si alguien lo escribiera
time.sleep(1)
#boton ingresar
btn_ingresar = driver.find_element(By.ID,"btnIngresar") # seleccionando el cuadro de texto
btn_ingresar.click()  # enviando un click
time.sleep(1)
vuelos=driver.find_element(By.XPATH, "//a[.//span[text()='Vuelos']]").click()
time.sleep(2)
crear=driver.find_element(By.ID,"botonCrear").click()
time.sleep(3)
# Seleccionar un avión
Select(driver.find_element(By.ID, "selectAvion")).select_by_index(1)  # o .select_by_value("ID_AVION")

# Seleccionar aeropuerto de origen
Select(driver.find_element(By.ID, "aeropuertoOrigen")).select_by_index(1)

# Seleccionar aeropuerto de destino
Select(driver.find_element(By.ID, "aeropuertoDestino")).select_by_index(3)

# Ingresar fecha de partida
driver.find_element(By.ID, "fechaPartida").send_keys("2025-06-08T10:00")

# Ingresar fecha de arribo
driver.find_element(By.ID, "fechaArribo").send_keys("2025-06-08T12:30")

# Seleccionar estado del vuelo
Select(driver.find_element(By.ID, "selectEstadoVuelo")).select_by_index(7)
time.sleep(5)
driver.close() # cierro la solapa actual del navegador
