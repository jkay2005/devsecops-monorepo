# Resource Group 
resource "azurerm_resource_group" "rg_tf" {
  name     = "nt548-devsecops-rg-tf"
  location = "Japan East" 
}

# 2. Azure Container Registry
resource "azurerm_container_registry" "acr_tf" {
  name                = "nt548devsecopsacrtf" 
  resource_group_name = azurerm_resource_group.rg_tf.name
  location            = azurerm_resource_group.rg_tf.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Cụm AKS
resource "azurerm_kubernetes_cluster" "aks_tf" {
  name                = "nt548-devsecops-aks-cluster-tf"
  location            = azurerm_resource_group.rg_tf.location
  resource_group_name = azurerm_resource_group.rg_tf.name
  dns_prefix          = "devsecopsakstf"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2s_v3" 
  }

  identity {
    type = "SystemAssigned"
  }
}