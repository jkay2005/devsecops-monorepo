resource "azurerm_role_assignment" "aks_tf_to_acr_tf" {
  principal_id                     = azurerm_kubernetes_cluster.aks_tf.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr_tf.id
  skip_service_principal_aad_check = true
}